import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/use-input';
import { css } from '@emotion/react';
import TodoList from '../components/TodoList';

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
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/signin');
    }
  }, [navigate]);

  const getTodos = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQDEiLCJzdWIiOjEsImlhdCI6MTY5MTY0ODIxNiwiZXhwIjoxNjkyMjUzMDE2fQ.Zv3wzxb8swwwWyaamnPAUCYZbTwTD699XFrPMU5Ehyk'}`,
        },
      });

      if (!response.ok) {
        throw new Error('할 일 목록을 불러오는 과정에서 문제가 발생했습니다.');
      }

      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);

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

    setError(null);

    if (!formIsValid) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: `POST`,
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQDEiLCJzdWIiOjEsImlhdCI6MTY5MTY0ODIxNiwiZXhwIjoxNjkyMjUzMDE2fQ.Zv3wzxb8swwwWyaamnPAUCYZbTwTD699XFrPMU5Ehyk'}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: enteredTodo,
        }),
      });

      if (!response.ok) {
        throw new Error('할 일 추가 과정에서 문제가 발생했습니다.');
      }

      if (response.ok) {
        getTodos();
      }
    } catch (error) {
      setError(error.message);
    }

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
