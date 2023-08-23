import { useRef, useState } from 'react';

export default function Todo({ todo, updateTodo, deleteTodo }) {
  const [isModifying, setIsModifying] = useState(false);
  const [enteredTodo, setEnteredTodo] = useState(todo.todo);
  const todoInputRef = useRef();

  const handleCheckBoxChange = e => {
    const {
      id,
      dataset: { todo },
      checked,
    } = e.target;
    updateTodo(id, todo, checked);
  };

  const handleDeleteButtonClick = e => {
    deleteTodo(e.target.id);
  };

  const handleModifyButtonCLick = () => {
    setIsModifying(true);
  };

  const handleCancleButtonCLick = () => {
    const { defaultValue } = todoInputRef.current;
    setEnteredTodo(defaultValue);
    setIsModifying(false);
  };

  const handleModifyFormSubmit = e => {
    e.preventDefault();
    const { id, value } = todoInputRef.current;
    updateTodo(id, value, todo.isCompleted);
    setEnteredTodo(value);
    setIsModifying(false);
  };

  return (
    <>
      {!isModifying && (
        <>
          <label>
            <input
              id={todo.id}
              data-todo={todo.todo}
              onChange={handleCheckBoxChange}
              type="checkbox"
              checked={todo.isCompleted}
            />
            <span>{enteredTodo}</span>
          </label>
          <button id={todo.id} data-testid="modify-button" onClick={handleModifyButtonCLick}>
            수정
          </button>
          <button id={todo.id} data-testid="delete-button" onClick={handleDeleteButtonClick}>
            삭제
          </button>
        </>
      )}
      {isModifying && (
        <form onSubmit={handleModifyFormSubmit}>
          <input
            id={todo.id}
            data-testid="modify-input"
            type="text"
            defaultValue={todo.todo}
            ref={todoInputRef}
          />
          <button type="submit" data-testid="submit-button">
            제출
          </button>
          <button type="button" data-testid="cancel-button" onClick={handleCancleButtonCLick}>
            취소
          </button>
        </form>
      )}
    </>
  );
}
