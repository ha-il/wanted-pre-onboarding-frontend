import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/use-input';
import { css } from '@emotion/react';
import TodoList from '../components/TodoList';
import AuthContext from '../store/authContext';
import TodoApi from '../apis';

const formControlCss = css({
  marginBottom: '1rem',
  '& input:focus': {
    outline: 'none',
  },
  '& label': {
    display: 'block',
  },
});

const invalidInputCss = css({
  '& input': {
    border: '1px solid #b40e0e',
    backgroundColor: '#fddddd',
  },
  '& input:focus': {
    borderColor: '#ff8800',
    backgroundColor: '#fbe8d2',
  },
});

const errorParagraph = css({
  color: '#b40e0e',
});

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const getTodos = useCallback(async () => {
    setError(null);
    const data = await TodoApi.getTodos({
      token: ctx.userData.token,
    });
    if (!data)
      return setError('할 일 목록을 불러오는 과정에서 에러가 발생했습니다.');
    setTodos(data);
  }, [ctx.userData.token]);

  const addTodo = async todo => {
    setError(null);
    const response = await TodoApi.addTodo({ token: ctx.userData.token, todo });
    if (!response) return setError('할 일 추가 과정에서 에러가 발생했습니다.');
    getTodos();
  };

  useEffect(() => {
    if (!ctx.userData.token) {
      navigate('/signin');
    }
    if (ctx.userData.token) {
      getTodos();
    }
  }, [ctx.userData, navigate, getTodos]);

  const {
    value: enteredTodo,
    isValid: enteredTodoIsValid,
    hasError: todoInputHasError,
    handleInputChange: handleTodoInputChange,
    reset: resetTodoInput,
  } = useInput(value => value.length > 0);

  let formIsValid = false;

  if (enteredTodoIsValid) {
    formIsValid = true;
  }

  const handleFormSubmit = async e => {
    e.preventDefault();

    if (!formIsValid) return;

    addTodo(enteredTodo);

    resetTodoInput();
  };

  let content = '';

  if (error) {
    content = error;
  }

  return (
    <>
      <h1>투 두 페이지</h1>
      <form onSubmit={handleFormSubmit}>
        <div css={[formControlCss, todoInputHasError && invalidInputCss]}>
          <input
            type="text"
            data-testid="new-todo-input"
            onChange={handleTodoInputChange}
            value={enteredTodo}
            placeholder="할 일을 입력해주세요."
          />
          <button data-testid="new-todo-add-button">추가</button>
          {todoInputHasError && (
            <p css={errorParagraph}>빈 칸은 제출할 수 없습니다.</p>
          )}
        </div>
      </form>
      <p>{content}</p>
      <TodoList todos={todos} getTodos={getTodos} />
    </>
  );
};

export default TodoPage;
