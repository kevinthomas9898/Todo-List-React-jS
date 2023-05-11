import React, { useState } from "react";
import "./App.css";

function App() {
  // this is a hook
  const [newItem, setNewItem] = useState("banana");
  const [todos, setTodos] = useState([]);

  // this is a function that will run when the form is submitted
  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });

    setNewItem("");
  }

  // this is a function that will run when the checkbox is clicked on a todo item 
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  // this is a function that will run when the delete button is clicked on a todo item
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter(todo => todo.id!== id);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            name="item"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To Do List</h1>
      <ul className="list">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="lis">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />{" "}
                {todo.title}
              </label>
              <button className="btn btn-danger" onClick={()=> deleteTodo(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
