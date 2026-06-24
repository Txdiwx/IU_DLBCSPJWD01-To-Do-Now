import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

const navigate = useNavigate();

const [form, setForm] = useState({
name: "",
email: "",
password: ""
});

const [loading, setLoading] = useState(false);

const register = async (e) => {

e.preventDefault();

if (
!form.name ||
!form.email ||
!form.password
) {
alert("Please fill in all fields");
return;
}

try {

setLoading(true);

await axios.post(
"http://localhost:4000/auth/register",
form
);

alert("Account created successfully");

setForm({
name: "",
email: "",
password: ""
});

// Redirect to login
navigate("/");

}
catch(error){

console.error(error);

alert(
error.response?.data?.message ||
"Registration failed"
);

}
finally{

setLoading(false);

}

};

return (

<div className="min-h-screen flex justify-center items-center bg-purple-600">

<form
onSubmit={register}
className="bg-white p-8 rounded-lg shadow-lg w-[400px]"
>

<h1 className="text-3xl font-bold mb-6 text-center">

Register

</h1>


<input
type="text"
placeholder="Full Name"
value={form.name}
onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}
className="w-full border p-3 rounded mb-4"
/>


<input
type="email"
placeholder="Email"
value={form.email}
onChange={(e)=>
setForm({
...form,
email:e.target.value
})
}
className="w-full border p-3 rounded mb-4"
/>


<input
type="password"
placeholder="Password"
value={form.password}
onChange={(e)=>
setForm({
...form,
password:e.target.value
})
}
className="w-full border p-3 rounded mb-6"
/>


<button
type="submit"
disabled={loading}
className="bg-purple-600 hover:bg-purple-700 text-white w-full p-3 rounded"
>

{
loading
?
"Creating Account..."
:
"Register"
}

</button>


<p className="text-center mt-4">

Already have an account?

<Link
to="/"
className="text-purple-700 ml-2"
>

Login

</Link>

</p>

</form>

</div>

);

}