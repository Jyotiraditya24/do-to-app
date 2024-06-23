import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema(
  {
    header: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ToDo = mongoose.model("ToDo", toDoSchema);

export default ToDo;
