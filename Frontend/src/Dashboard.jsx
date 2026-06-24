import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  FaTasks,
  FaTrash,
  FaRegDotCircle,
  FaCheckCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
  toast,
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [color, setColor] = useState("purple");

  const API_URL =
    "http://localhost:4000/tasks";

  //====================
  // FETCH TASKS
  //====================

  const fetchTasks = async () => {

    try {

      const res =
        await axios.get(API_URL);

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  //====================
  // LOGOUT
  //====================

  const handleLogout = () => {

    if (
      window.confirm(
        "Logout?"
      )
    ) {

      localStorage.removeItem(
        "token"
      );

      navigate("/login");

    }

  };

  //====================
  // COLORS
  //====================

  const colorStyles = {

    red: {
      text: "text-red-400",
      border: "border-red-400",
      bg: "bg-red-500"
    },

    yellow: {
      text: "text-yellow-400",
      border: "border-yellow-400",
      bg: "bg-yellow-500"
    },

    green: {
      text: "text-green-400",
      border: "border-green-400",
      bg: "bg-green-500"
    },

    pink: {
      text: "text-pink-400",
      border: "border-pink-400",
      bg: "bg-pink-500"
    },

    orange: {
      text: "text-orange-400",
      border: "border-orange-400",
      bg: "bg-orange-500"
    },

    purple: {
      text: "text-purple-400",
      border: "border-purple-400",
      bg: "bg-purple-500"
    }

  };

  const colors = [
    "red",
    "yellow",
    "green",
    "pink",
    "orange",
    "purple"
  ];

  //====================
  // CREATE TASK
  //====================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!task) {

        toast.error(
          "Enter a task"
        );

        return;

      }

      try {

        await axios.post(
          API_URL,
          {
            task,
            color,
            taskDone: false
          }
        );

        setTask("");

        fetchTasks();

      } catch (error) {

        console.log(error);

      }

    };

  //====================
  // DELETE
  //====================

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete task?"
        )
      )
        return;

      await axios.delete(
        `${API_URL}/${id}`
      );

      fetchTasks();

    };

  //====================
  // COMPLETE
  //====================

  const handleDone =
    async (
      id,
      current
    ) => {

      await axios.put(
        `${API_URL}/${id}`,
        {
          taskDone: !current
        }
      );

      fetchTasks();

    };

  //====================
  // DELETE ALL
  //====================

  const handleDeleteAll =
    async () => {

      if (
        !window.confirm(
          "Delete all tasks?"
        )
      )
        return;

      await axios.delete(
        API_URL
      );

      fetchTasks();

    };

    return (
      <div className="min-h-screen bg-purple-600 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
    
          {/* HEADER */}
          <div className="bg-white text-black rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">To Do Now</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                We help you plan your day
              </p>
            </div>
    
            <div className="flex gap-3 items-center w-full sm:w-auto justify-between sm:justify-end">
              <FaTasks size={35} />
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-auto"
              >
                Logout
              </button>
            </div>
    
          </div>
    
          {/* TASK FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 rounded-xl p-4 sm:p-5 mt-4"
          >
    
            {/* INPUT ROW */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
    
              <input
                type="text"
                value={task}
                placeholder="Enter your task here"
                onChange={(e) => setTask(e.target.value)}
                className="flex-1 bg-gray-700 text-white placeholder-white px-4 py-3 rounded-lg outline-none"
              />
    
              {/* COLORS */}
              <div className="flex flex-wrap gap-2 items-center justify-start sm:justify-center">
    
                {colors.map((c) => (
                  <label key={c} className="cursor-pointer">
    
                    <input
                      hidden
                      type="radio"
                      value={c}
                      checked={color === c}
                      onChange={(e) => setColor(e.target.value)}
                    />
    
                    <div
                      className={`
                        w-6 h-6 sm:w-7 sm:h-7 rounded-full
                        ${colorStyles[c].bg}
                        ${color === c ? "ring-4 ring-white" : ""}
                      `}
                    />
                  </label>
                ))}
    
              </div>
    
              <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg w-full sm:w-auto">
                Add
              </button>
    
            </div>
          </form>
    
          {/* TASK LIST */}
          <ul className="space-y-3 mt-5">
    
            {tasks
              .filter(t => t.createdAt)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((task) => (
    
                <li
                  key={task._id}
                  className="bg-gray-950 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-4"
                >
    
                  {/* TASK CONTENT */}
                  <div className={`border-l-4 pl-3 sm:pl-4 ${colorStyles[task.color]?.border}`}>
    
                    <p className={`text-white text-lg sm:text-xl ${task.taskDone ? "line-through text-gray-500 opacity-60" : ""}`}>
                      {task.task}
                    </p>
    
                    <p className={`text-xs sm:text-sm ${colorStyles[task.color]?.text}`}>
                      Created on{" "}
                      <span className="font-bold">
                        {new Date(task.createdAt).toLocaleString("en-GB", {
                          weekday: "short",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false
                        })}
                      </span>
                    </p>
    
                  </div>
    
                  {/* ACTION BUTTONS */}
                  <div className="flex flex-row sm:flex-col gap-3 sm:gap-4 justify-end sm:justify-center">
    
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 text-xl"
                    >
                      <FaTrash />
                    </button>
    
                    <button
                      onClick={() => handleDone(task._id, task.taskDone)}
                      className="text-green-500 text-xl"
                    >
                      {task.taskDone ? <FaCheckCircle /> : <FaRegDotCircle />}
                    </button>
    
                  </div>
    
                </li>
    
              ))}
    
          </ul>
    
          {/* DELETE ALL */}
          {tasks.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl"
            >
              Delete All Tasks
            </button>
          )}
    
        </div>
    
        <ToastContainer />
      </div>
    );
          }