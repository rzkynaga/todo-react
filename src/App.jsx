import React, { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-teal-900 via-blue-800 to-purple-900 
      flex items-center justify-center p-5 text-white transition-all duration-500"
    >
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6 text-gray-900">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
          Todo List
        </h1>

        <div className="flex gap-3 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none 
            focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <span className="text-gray-800">{task}</span>
              <button
                onClick={() => removeTask(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-5">
            No tasks yet. Add some!
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
