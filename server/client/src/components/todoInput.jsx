import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useTodoContext } from "../context/todoContext";

const TodoInput = () => {
  const [content, setContent] = useState("");
  const [header, setHeader] = useState("");
  const { user } = useAuthContext();
  const { setTodos } = useTodoContext();

  const handleAddTask = async () => {
    if (!content || !header) {
      alert("Please fill in both the header and content fields.");
      return;
    }

    if (!user || !user.id) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${window.location.origin}/api/todo/createTodos/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            header: header,
            content: content,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = `Failed to add task: ${response.statusText}`;
        console.error(errorMessage);
        alert(errorMessage);
        return;
      }

      const data = await response.json();

      const localData = localStorage.getItem("todos");
      let localDataParsed;

      try {
        localDataParsed = localData ? JSON.parse(localData) : [];
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        localDataParsed = [];
      }

      if (!Array.isArray(localDataParsed)) {
        localDataParsed = [];
      }

      localDataParsed.push(data);
      localStorage.setItem("todos", JSON.stringify(localDataParsed));

      setTodos(localDataParsed);
      setContent("");
      setHeader("");
      alert("Todo Added");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("There was an error adding the task. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <input
        type="text"
        className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        value={header}
        placeholder="Enter header"
        onChange={(e) => setHeader(e.target.value)}
      />
      <input
        type="text"
        className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        value={content}
        placeholder="Enter content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-600 rounded-lg px-4 py-2 text-white hover:bg-blue-700 transition duration-200"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default TodoInput;
