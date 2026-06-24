import React, { useState, useEffect } from "react";
import axios from "axios"
import {
  FaTasks,
  FaTrash,
  FaRegDotCircle,
  FaCheckCircle
} from "react-icons/fa";

//Toast error catching
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
//Use State Hooks
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [color, setColor] = useState("white");

//Backend UR
const API_URL = 'http://localhost:4000/tasks';

// Fetch the tasks
const fetchTasks =async () => {
  try {
    const res= await axios.get(API_URL);
    setTasks(res.data);
  } catch(error) {
  console.error("Error fetching Tasks", error)
  }
};

//useEffect
useEffect(() => {
  fetchTasks();
}, []);

console.log(tasks);

//Dynamic colors
 const colorStyles = {
  red: {
    text: "text-red-400",
    border: "border-red-400",
  },

  yellow: {
    text: "text-yellow-400",
    border: "border-yellow-400",
  },

  pink: {
    text: "text-pink-500",
    border: "border-pink-500"
  },

  orange: {
    text: "text-orange-400",
    border: "border-orange-400"
  }, 

  purple: {
    text: "text-purple-400",
    border: "border-purple-400"
  },

  green: {
    text: "text-green-400",
    border: "border-green-400"
  }

 }

  const colors = [
    "red",
    "yellow",
    "green",
    "pink",
    "orange",
    "purple",
  ];

  //handleSubmit CREATE A NEW TASK
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!task) {
      toast.error("You must write a task!", {
        style: {
          background: "black",
           color: "tomato",
           fontsize: "16px",
           borderRadius: "8px",   
      },
    });
     return;
  }
  const res = await axios.post(API_URL, {
    task: task,
    color: color,
    taskDone: false,
  });

  console.log("Task created", res.data);
  setTask("")
  setColor("gray")
  fetchTasks();
  }catch (error) {
    console.error("Error creating task",error);
  }
};

//handleDelete DELETE A TASK
const handleDelete = async (id) => {
 try {
  if (window.confirm("Are you sure?"))
  await axios.delete(`${API_URL}/${id}`);
fetchTasks();
  }catch (error) {
  console.error("Error deleting task", error)
 }
}

//handleDone MARK AS DONE
const handleDone = async (id) => {
  try {
    await axios.put(`${API_URL}/${id}`,{
      taskDone: !task.taskDone,
    });
    fetchTasks();
  }catch (error) {
    console.error("Error updating task", error)
  }
}

//handleClearAll CLEAR ALL TASKS
const handleDeleteAll = async () => {
  try {
    if ( window.confirm("Are you sure you want to delete all tasks?")
    ){
    await axios.delete(API_URL);
    fetchTasks();
    }
  }catch (error) {
    console.error("Error clearing all tasks", error);
  }
}
  return (
    <div className="min-h-screen w-full bg-purple-600 flex items-center justify-center text-white p-10">

      {/* Container */}
      <div className="w-[700px]">

        {/* Header */}
        <div className="bg-white text-black p-5 rounded-lg flex items-center justify-between">

          <div>
            <h1 className="text-2xl mb-2 font-bold">
              To Do Now
            </h1>

            <p className="text-sm text-gray-600">
              This app will help you plan out your day
            </p>
          </div>

          <div className="text-5xl">
            <FaTasks />
          </div>

        </div>

        {/* Form */}
      <form 
      onSubmit={handleSubmit}
      className="bg-gray-800 flex justify-between gap-5 p-5 rounded-lg mt-3">

        <input
         type="text"
         placeholder="Enter your task here"
         className="px-3 py-2 bg-gray-900 w-full rounded-md outline-none"
         value={task}
         onChange={(e) => setTask(e.target.value)}
         />

         {/* Colors */}
          <div className="flex items-center gap-3">

          {/* Red */}
           <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="red"
                checked={color === "red"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
               />
             <span
             className={`w-6 h-6 rounded-full block bg-red-500 ${
             color === "red"
             ? "border-2 border-white"
             : ""
              }`}
             />
           </label>

  {/* Yellow */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="color"
      value="yellow"
      checked={color === "yellow"}
      onChange={(e) => setColor(e.target.value)}
      className="hidden"
    />
    <span
      className={`w-6 h-6 rounded-full block bg-blue-500 ${
        color === "blue"
          ? "border-2 border-white"
          : ""
      }`}
    />
  </label>

  {/* Green */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="color"
      value="green"
      checked={color === "green"}
      onChange={(e) => setColor(e.target.value)}
      className="hidden"
    />
    <span
      className={`w-6 h-6 rounded-full block bg-green-500 ${
        color === "green"
          ? "border-2 border-white"
          : ""
      }`}
    />
  </label>

  {/* Pink */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="color"
      value="pink"
      checked={color === "pink"}
      onChange={(e) => setColor(e.target.value)}
      className="hidden"
    />
    <span
      className={`w-6 h-6 rounded-full block bg-pink-500 ${
        color === "pink"
          ? "border-2 border-white"
          : ""
      }`}
    />
  </label>

  {/* Orange */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="color"
      value="orange"
      checked={color === "orange"}
      onChange={(e) => setColor(e.target.value)}
      className="hidden"
    />
    <span
      className={`w-6 h-6 rounded-full block bg-orange-500 ${
        color === "orange"
          ? "border-2 border-white"
          : ""
      }`}
    />
  </label>

  {/* Purple */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="color"
      value="purple"
      checked={color === "purple"}
      onChange={(e) => setColor(e.target.value)}
      className="hidden"
    />
    <span
      className={`w-6 h-6 rounded-full block bg-purple-500 ${
        color === "purple"
          ? "border-2 border-white"
          : ""
      }`}
    />
  </label>

  {/* Submit */}
  <button
    type="submit"
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
  >
    Submit
  </button>

</div>

</form>
{/* Tasks */}
        <ul className="flex flex-col gap-2 w-full mt-3">
          {/*Task*/}
          {tasks
          .sort((a, b) => new Date(b.createdAt) - new Date (a.createdAt))
          .map((task) =>(
           <li  key={task._id} className="w-full bg-gray-950 px-6 py-5 rounded-xl flex justify-between">
           <div className={`border-l-5 ${colorStyles[task.color].border} pl-3 rounded-md`}>
           <p
            className={`text-xl mb-1 ${task.taskDone? "line-through opacity-60": ""}`}>
              {task.task}
             </p>
             <span className="text-sm text-zinc-400">
               Created on
             </span>{""}
             <span
                className={`text-sm ${colorStyles[task.color].text} font-bold`}>
                {new Date(task.createdAt).toLocaleDateString('en-UK', {
                weekday: "long",
                })}
             </span>{" "}
             <span 
                className={`text-sm ${colorStyles[task.color].text}`}>
                {new Date(task.createdAt).toLocaleDateString('en-UK', {
                day: "2-digit",
                month: "long",
                year: "numeric",
               })} {" "}
               -{" "} 
               {new Date(task.createdAt).toLocaleTimeString('en-UK' , {
                hour: "2-digit",
                minute: "2-digit",
               })}
               
             </span>
            </div>

           <div className="flex items-center gap-3">
             <button 
             className="text-red-500 cursor-pointer" 
             onClick={() => handleDelete(task._id)}>
               <FaTrash />
               </button>
               <button className="text-green-500 cursor-pointer text-lg" onClick={() =>
              handleDone(task._id, task.taskDone)}>
                {!task.taskDone ? <FaRegDotCircle/> : <FaCheckCircle/>}
                 </button>
             </div>
         </li>
          ))}
          

        </ul>
        {/* Delete all button*/}
       {tasks.length > 0 && ( 
        <button
        className="bg-red-600 w-full hover:bg-red-700 px-4 py-2 rounded-md"
        onClick={handleDeleteAll}>
        Delete All Tasks
        </button>)}

      </div>
      <ToastContainer/>

    </div>
  );
};

export default App;
