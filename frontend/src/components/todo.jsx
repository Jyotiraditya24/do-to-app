import React from "react";
import Header from "./header";
import ButtonGroup from "./buttonGroup";

const Todo = ({ content, header, postId }) => {
  return (
    <div className="flex flex-row items-center justify-between bg-white rounded-lg p-5">
      <Header header={header} />
      <ButtonGroup postId={postId} />
    </div>
  );
};

export default Todo;
