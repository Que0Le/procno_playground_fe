import "./App.css";
import React, {useState} from "react";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Topic from "./pages/Topic";
import CreateTopic from "./pages/CreateTopic";
import Testing from "./pages/Testing";


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
					<Route path="/testing">
						<Testing user={user} setUser={setUser}/>
					</Route>
					<Route path="/about">
						<About user={user} setUser={setUser}/>
					</Route>
					<Route path="/home">
						<Home user={user} setUser={setUser}/>
					</Route>
					<Route path="/topic/:topicUniqId">
						<Topic user={user} setUser={setUser}/>
					</Route>
					<Route path="/create-topic">
						<CreateTopic user={user} setUser={setUser}/>
					</Route>
					<Route path="/dashboard">
						<Dashboard user={user} setUser={setUser}/>
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
