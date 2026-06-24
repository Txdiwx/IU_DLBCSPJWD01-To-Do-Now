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

<div className="min-h-screen bg-purple-600 p-8">

<div className="max-w-4xl mx-auto">

{/* HEADER */}

<div
className="
bg-white
text-black
rounded-xl
p-6
flex
justify-between
items-center
"
>

<div>

<h1 className="text-3xl font-bold">

To Do Now

</h1>

<p className="text-gray-600">

We help you plan your day

</p>

</div>

<div className="flex gap-4 items-center">

<button
onClick={handleLogout}
className="
bg-red-600
hover:bg-red-700
text-white
px-5
py-2
rounded-lg
"
>

Logout

</button>

<FaTasks size={45}/>

</div>

</div>

{/* TASK FORM */}

<form
onSubmit={handleSubmit}
className="
bg-gray-800
rounded-xl
p-5
mt-4
"
>

<div className="flex gap-4">

<input
type="text"
value={task}
placeholder="Enter your task here"
onChange={(e)=>
setTask(
e.target.value
)
}
className="
flex-1
bg-gray-700
text-white
placeholder-white
px-4
py-3
rounded-lg
outline-none
"
/>

{/* COLOR DOTS */}

<div className="flex gap-2 items-center">

{colors.map((c)=>(

<label
key={c}
className="cursor-pointer"
>

<input
hidden
type="radio"
value={c}
checked={color===c}
onChange={(e)=>
setColor(
e.target.value
)
}
/>

<div
className={`
w-7
h-7
rounded-full
${colorStyles[c].bg}
${
color===c
?
"ring-4 ring-white"
:
""
}
`}
/>

</label>

))}

</div>

<button
className="
bg-red-600
hover:bg-red-700
px-5
rounded-lg
"
>

Add

</button>

</div>

</form>

{/* TASK LIST */}

<ul className="space-y-3 mt-5">

{tasks
  .filter(t => t.createdAt)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

.map((task)=>(

<li
key={task._id}
className="
bg-gray-950
rounded-xl
p-5
flex
justify-between
"
>

<div
className={`
border-l-4
pl-4
${colorStyles[
task.color
]?.border}
`}
>

<p
className={`
text-white
text-xl

${
task.taskDone
?
"line-through text-gray-500 opacity-60"
:
""
}
`}
>

{task.task}

</p>

const date = new Date(task.createdAt);

<p className={`text-sm ${colorStyles[task.color]?.text}`}>
  Created on{" "}
  <span className="font-bold">
    {new Date(task.createdAt).toLocaleString("en-GB", {
      weekday: "long",
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

<div className="flex gap-4">

<button
onClick={()=>
handleDelete(
task._id
)
}
className="text-red-500"
>

<FaTrash/>

</button>

<button
onClick={()=>
handleDone(
task._id,
task.taskDone
)
}
className="text-green-500"
>

{
task.taskDone
?
<FaCheckCircle/>
:
<FaRegDotCircle/>
}

</button>

</div>

</li>

))}

</ul>

{/* DELETE ALL */}

{tasks.length > 0 && (

<button
onClick={
handleDeleteAll
}
className="
mt-4
w-full
bg-red-600
hover:bg-red-700
py-3
rounded-xl
"
>

Delete All Tasks

</button>

)}

</div>

<ToastContainer/>

</div>

);

}