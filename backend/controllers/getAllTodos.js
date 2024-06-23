import ToDo from "../models/ToDoModel";

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
