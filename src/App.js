// import logo from "./logo.svg";
import "./App.css";
import React, {useEffect, useState} from "react";
// import { Route, BrowserRouter as Router } from "react-router-dom";
// import api from "./services/api";
// import {Button} from "@mui/material";
// import { Link as RRDLink} from "react-router-dom";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
	const [user, setUser] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
	//
	// useEffect(() => {
	//
	// });
	return (
		<Router>
			<div>
				<Navbar user={user} setUser={setUser}/>
				<>
					<Route exact path="/">
						<Redirect to="/dashboard" />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/home">
						<Home user={user}/>
					</Route>
					<Route path="/dashboard">
						<Dashboard user={user}/>
					</Route>
					<Route path="/login">
						<Login user={user} setUser={setUser}/>
					</Route>
					<Route path="/signup">
						<Signup user={user} setUser={setUser}/>
					</Route>
				</>
			</div>
		</Router>
	);
}

export default App;
