import { useContext, useState } from 'react';
import AuthContext from '../store/authContext';
import TodoApi from '../apis';
import Todo from './Todo';

export default function TodoList({ todos, getTodos }) {
  const [error, setError] = useState(null);
  const ctx = useContext(AuthContext);

  const updateTodo = async (todoId, todo, todoIsCompleted) => {
    setError(null);
    const response = await TodoApi.updateTodo({
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

  return (
    <>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Todo todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </>
  );
}
