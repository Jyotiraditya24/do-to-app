import React, { useState } from "react";
import Modal from "react-modal";
import { useTodoContext } from "../context/todoContext";

const ButtonGroup = ({ postId }) => {
  const { todos, setTodos } = useTodoContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  const handleDelete = async () => {
    if (!postId) {
      console.error("Post ID not found");
      return;
    }

    try {
      const response = await fetch(
        `${window.location.origin}/api/todo/deleteTodos/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // filter the deleted data
      let localData = JSON.parse(localStorage.getItem("todos")) || [];
      localData = localData.filter((todo) => todo._id !== postId);
      localStorage.setItem("todos", JSON.stringify(localData));

      // set the todoContext
      setTodos(localData);
      alert("Deleted todo");
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error");
      // Handle error (e.g., show error message to user)
    }
  };

  const handleEdit = (e) => {
    // Find the todo item to edit
    const todoToEdit = todos.find((todo) => todo._id === postId);
    if (todoToEdit) {
      setHeader(todoToEdit.header);
      setContent(todoToEdit.content);
    }
    setModalIsOpen(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/todo/updateTodos/${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ header, content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();

      // Update the local data
      let localData = JSON.parse(localStorage.getItem("todos")) || [];
      localData = localData.map((todo) =>
        todo._id === postId ? updatedTodo : todo
      );
      localStorage.setItem("todos", JSON.stringify(localData));

      console.log(localData);
      // Set the todoContext
      setTodos(localData);
      alert("Updated todo");

      // Close the modal
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        className="bg-yellow-300 rounded-lg px-4 py-2"
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        className="bg-red-600 rounded-lg px-4 py-2 text-white"
        onClick={handleDelete}
      >
        Delete
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Todo"
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="header"
                className="block text-sm font-medium text-gray-700"
              >
                Header
              </label>
              <input
                type="text"
                id="header"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ButtonGroup;
