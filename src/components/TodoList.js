import { useContext, useState } from 'react';
import AuthContext from '../store/authContext';
import TodoApi from '../apis';

export default function TodoList({ todos, getTodos }) {
  const [error, setError] = useState(null);
  const ctx = useContext(AuthContext);

  const updateIsCompleted = async (todoId, todo, todoIsCompleted) => {
    setError(null);
    const response = await TodoApi.updateIsCompleted({
      token: ctx.userData.token,
      todoId,
      todo,
      todoIsCompleted,
    });
    if (!response) return setError('할 일 완료 과정에서 문제가 발생했습니다.');
    getTodos();
  };

  const deleteTodo = async todoId => {
    setError(null);
    const response = await TodoApi.deleteTodo({
      token: ctx.userData.token,
      todoId,
    });
    if (!response) return setError('할 일 삭제 과정에서 문제가 발생했습니다.');
    getTodos();
  };

  const handleCheckBoxChange = e => {
    const {
      id,
      dataset: { todo },
      checked,
    } = e.target;
    updateIsCompleted(id, todo, checked);
  };

  const handleDeleteButtonClick = e => {
    deleteTodo(e.target.id);
  };

  return (
    <>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                id={todo.id}
                data-todo={todo.todo}
                onChange={handleCheckBoxChange}
                type="checkbox"
                checked={todo.isCompleted}
              />
              <span>{todo.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button
              id={todo.id}
              data-testid="delete-button"
              onClick={handleDeleteButtonClick}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </>
  );
}
