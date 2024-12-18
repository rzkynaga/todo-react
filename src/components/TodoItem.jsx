import React from "react";

const TodoItem = ({ task, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center p-2 border-b">
      <span>{task}</span>
      <div>
        <button
          onClick={onEdit}
          className="text-yellow-500 hover:underline mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:underline"
        >
          Hapus
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
