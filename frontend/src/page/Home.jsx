import React, { useEffect, useState } from "react";
import TodoList from "../components/todoList";
import TodoInput from "../components/todoInput";

const Home = () => {
  return (
    <div className="bg-gradient-to-t from-neutral-50 to-slate-200 flex min-h-screen flex-1 flex-col justify-start items-center px-6 py-12 lg:px-8">
      <section className="flex flex-col bg-purple-500 p-10 rounded-lg gap-10">
        <div className="font-bold text-4xl flex flex-col sm:flex-row">
          <p> Hello there,</p>
          <p> what are you tasks today? </p>
        </div>
        <TodoInput />
        <div className="overflow-auto max-h-[550px]">
          <TodoList />
        </div>
      </section>
    </div>
  );
};

export default Home;
