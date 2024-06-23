import React from "react";

const ButtonGroup = ({ postId }) => {
  const handleDelete = async () => {
    if (!postId) {
      console.error("User ID not found");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/todo/deleteTodos/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // filter the deleted data
      let localData = JSON.parse(localStorage.getItem("todos"));
      localData = localData.todos.filter((todo) => todo._id !== postId);
      localStorage.setItem("todos", JSON.stringify(localData));
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleEdit = (e) => {};

  return (
    <div className="flex flex-row gap-2">
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
    </div>
  );
};

export default ButtonGroup;
