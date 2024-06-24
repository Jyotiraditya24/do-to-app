import React from "react";
import Header from "./header";
import ButtonGroup from "./buttonGroup";

const Todo = ({ content, header, postId }) => {
  return (
    <section className="bg-white rounded-lg p-5 flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between ">
        <Header header={header} />
        <ButtonGroup postId={postId} />
      </div>
      <p className="flex flex-col border-purple-400 border- p-2 rounded-lg ">{content}</p>
    </section>
  );
};

export default Todo;
