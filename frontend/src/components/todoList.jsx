import React, { useEffect, useState } from "react";
import Todo from "../components/todo";
import { useAuthContext } from "../context/authContext";
import { useTodoContext } from "../context/todoContext";

const TodoList = () => {
  const { user } = useAuthContext();
  const { todos, setTodos } = useTodoContext();

  useEffect(() => {
    const getAllTodos = async () => {
      if (!user?.id) {
        console.error("User ID not found");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3001/api/todo/getAllTodos/${user?.id}`
        );
        const data = await response.json();
        setTodos(data);
        // localstorage
        localStorage.setItem("todos", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getAllTodos();
  }, [user?.id, todos.length]);

  return (
    <div className="flex flex-col gap-5 overflow-scroll">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <Todo
            key={todo._id}
            content={todo.content}
            header={todo.header}
            postId={todo._id}
          />
        ))
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
};

export default TodoList;
