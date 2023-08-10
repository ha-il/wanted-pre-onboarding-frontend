import { useEffect } from 'react';

export default function TodoList({ todos, getTodos }) {
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" />
              <span>{todo.todo}</span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
