import ToDo from "../models/ToDoModel.js";

export const getAllTodos = async (req, resp) => {
  const { id: userId } = req.params;
  try {
    const todos = await ToDo.find({ createdBy: userId });
    if (!todos || todos.length === 0) {
      return resp.status(400).json({ error: "No todos present by the user" });
    }
    return resp.json({ todos });
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
    return resp.json(savedSingleTodo.select("-createdBy"));
  } catch (error) {
    console.error(error.message);
    return resp.status(500).json({ error: "Internal Server Error" });
  }
};
