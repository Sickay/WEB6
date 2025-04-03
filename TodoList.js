// TodoList.js
import React from "react";
import TodoItem from "./TodoItem";
import "./App.css";

function TodoList({ todos, deleteTodo, toggleComplete }) {
  if (!todos || !Array.isArray(todos)) {
    return <p>No tasks available.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
}

export default TodoList;