import ToDo from "../models/ToDoModel.js";

export const getAllTodos = async (req, resp) => {
  const { id: userId } = req.params;
  try {
    const todos = await ToDo.find({ createdBy: userId });
    if (!todos || todos.length === 0) {
      return resp.status(400).json({ error: "No todos present by the user" });
    }
    return resp.json(todos);
  } catch (error) {
    console.log(error.message);
    return resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTodos = async (req, resp) => {
  const { header, content } = req.body;
  const { id: userId } = req.params;

  try {
    // Check if all required fields are present
    if (!header || !content || !userId) {
      return resp.status(400).json({ error: "All fields are not present" });
    }
    const singleTodo = new ToDo({
      header: header,
      content: content,
      createdBy: userId,
    });

    // Save the ToDo to the database
    const savedSingleTodo = await singleTodo.save();

    // Check if saving was successful
    if (!savedSingleTodo) {
      return resp.status(400).json({ error: "Could not create Todo" });
    }

    // Respond with the saved todo, excluding the 'createdBy' field
    return resp.status(201).json(savedSingleTodo);
  } catch (error) {
    console.error(error.message);
    return resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTodos = async (req, resp) => {
  const { id: todoId } = req.params;
  try {
    if (!todoId) {
      return resp.status(400).json({ error: "All fields are not present" });
    }
    const deletedTodo = await ToDo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return resp.status(404).json({ error: "Todo not found" });
    }
    return resp.json({
      message: "Todo deleted successfully",
      deletedTodo: deletedTodo,
    });
  } catch (error) {
    console.error(error.message);
    return resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTodos = async (req, resp) => {
  const { header, content } = req.body;
  const { id: todoId } = req.params;
  try {
    const todo = await ToDo.findById(todoId);

    if (!todo || todo.length === 0) {
      return resp.status(400).json({ error: "No todos present by the user" });
    }

    const updatedTodo = await ToDo.findByIdAndUpdate(
      todoId,
      { header, content },
      { new: true } // returns the updated document
    );

    if (!updatedTodo) {
      return resp.status(400).json({ error: "Could not update Todo" });
    }

    return resp.json(updatedTodo);
  } catch (error) {
    console.error(error.message);
    return resp.status(500).json({ error: "Internal Server Error" });
  }
};
