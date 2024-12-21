import React, { useState, useEffect } from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import { CSSTransition, TransitionGroup } from "react-transition-group";


const Task = ({
  task,
  index,
  toggleCompletion,
  removeTask,
  handleDragStart,
  handleDrop,
}) => {
  return (
    <li
      className={`flex justify-between items-center p-3 rounded-lg shadow-sm transition-all duration-500 ${
        task.completed
          ? "bg-gray-700 text-gray-200 line-through opacity-50"
          : "bg-gray-100 text-gray-800 hover:bg-opacity-80"
      }`}
      draggable
      onDragStart={(e) => handleDragStart(index, e)}
      onDrop={(e) => handleDrop(index, e)}
      onDragOver={(e) => e.preventDefault()}
    >
      <DotsVerticalIcon className="w-4 h-5 text-gray-500 mr-4 cursor-move" />
      <span
        onClick={() => toggleCompletion(index)}
        className="cursor-pointer flex-grow"
      >
        {task.text}
      </span>
      <button
        onClick={() => removeTask(index)}
        className="transition-all duration-500 text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </li>
  );
};

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDragStart = (index, event) => {
    event.dataTransfer.setData("taskIndex", index);
  };

  const handleDrop = (index, event) => {
    const draggedIndex = event.dataTransfer.getData("taskIndex");
    if (draggedIndex !== index) {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(index, 0, movedTask);
      setTasks(updatedTasks);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-5 transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200"
          : "bg-gradient-to-br from-teal-900 via-blue-800 to-purple-900 text-white"
      }`}
    >
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-5 right-5 p-3 rounded-full shadow-lg transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-white text-gray-900 hover:bg-gray-200"
        }`}
      >
        {isDarkMode ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}
      </button>

      <div
        className={`w-full max-w-lg rounded-xl shadow-xl p-6 transition-all duration-500 ${
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        <header>
          <h1
            className={`text-3xl font-extrabold text-center mb-5 ${
              isDarkMode ? "text-blue-400" : "text-blue-800"
            }`}
          >
            ToDo List
          </h1>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="flex gap-3 mb-5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className={`flex-grow p-3 rounded-lg border shadow-sm focus:outline-none transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-gray-500"
                : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-400"
            }`}
          />
          <button
            type="submit"
            className={`p-3 rounded-lg shadow-lg transition-all duration-500 ${
              isDarkMode
                ? "bg-blue-700 text-white hover:bg-blue-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              index={index}
              toggleCompletion={toggleCompletion}
              removeTask={removeTask}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
            />
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center mt-5 transition-all duration-500">
            No tasks yet. Add some!
          </p>
        )}
      </div>
      <footer className="absolute bottom-5 text-center text-gray-400 font-light text-sm">
        <p>Copyright 2024 © Moh Rizky Sinaga. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

// Copyright 2024 © Moh Rizky Sinaga
// All rights reserved.