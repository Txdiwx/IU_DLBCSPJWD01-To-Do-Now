import React from "react";

import {
Routes,
Route
}
from "react-router-dom";

import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

export default function App(){

return(

<Routes>

<Route
path="/"
element={<Welcome/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route
path="/dashboard"
element={<Dashboard/>}
/>

</Routes>

);

}