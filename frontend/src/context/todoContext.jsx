import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const TodoContext = createContext();

// Custom hook to use the TodoContext
export const useTodoContext = () => {
  return useContext(TodoContext);
};

// Context provider component
export const TodoContextProvider = ({ children }) => {
  // Initialize the state from localStorage, or set it to an empty array if nothing is found
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if(!undefined){
        return [];
    }
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Update localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
