import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const login = async (e) => {

e.preventDefault();

if (!email || !password) {
alert("Please enter email and password");
return;
}

try {

setLoading(true);

const res = await axios.post(
"http://localhost:4000/auth/login",
{
email,
password
}
);

// Save token
localStorage.setItem(
"token",
res.data.token
);

alert("Logged in successfully");

// Redirect
navigate("/dashboard");

}
catch(error){

console.error(error);

alert(
error.response?.data?.message ||
"Login failed"
);

}
finally{

setLoading(false);

}

};

return (

<div className="min-h-screen flex justify-center items-center bg-purple-600">

<form
onSubmit={login}
className="bg-white p-8 rounded-lg shadow-lg w-[400px]"
>

<h1 className="text-3xl font-bold mb-6 text-center">

Login

</h1>


<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
className="w-full border p-3 rounded mb-4"
/>


<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(e.target.value)
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
"Logging in..."
:
"Login"
}

</button>


<p className="text-center mt-4">

Don't have an account?

<Link
to="/register"
className="text-purple-700 ml-2"
>

Register

</Link>

</p>

</form>

</div>

);

}