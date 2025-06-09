import React, { useState } from "react";
import { addTaskToFirestore } from "../services/taskService";
import toast from "react-hot-toast";

const AddTaskComponent = ({ onTaskAdded }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTaskToFirestore({ title: taskTitle, description: taskDesc });
      setTaskTitle("");
      setTaskDesc("");
      toast.success("Task added!");
      if (onTaskAdded) onTaskAdded();
    } catch (error) {
      toast.error("Failed to add task.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-green-50 rounded-md shadow p-6">
      <h1 className="text-green-900 font-semibold text-lg mb-4">Add Your Task</h1>
      <form onSubmit={handleAddTask} className="flex flex-col gap-3">
        <input
          type="text"
          id="taskTitle"
          placeholder="Task Title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="input input-bordered bg-green-800 text-white placeholder:text-green-200"
        />
        <textarea
          id="taskDesc"
          cols="30"
          rows="7"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          className="textarea textarea-bordered bg-green-800 text-white placeholder:text-green-200 resize-none"
          placeholder="Write your task here..."
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-success w-full"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddTaskComponent;