import { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/authContext';

export default function TodoList({ todos, getTodos }) {
  const [error, setError] = useState(null);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const updateIsCompleted = async (todoId, todoIsCompleted, todo) => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${ctx.userData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo,
          isCompleted: todoIsCompleted,
        }),
      });
      if (!response.ok) {
        throw new Error('완료 업데이트 과정에서 문제가 발생했습니다.');
      }

      if (response.ok) {
        getTodos();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTodo = async todoId => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${ctx.userData.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('삭제 과정에서 문제가 발생했습니다.');
      }

      if (response.ok) {
        getTodos();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckBoxChange = e => {
    const {
      checked,
      id,
      dataset: { todo },
    } = e.target;
    updateIsCompleted(id, checked, todo);
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
