import logo from "./logo.svg";
import "./App.css";
import React, {useEffect, useRef, useState} from "react";
// import { Route, BrowserRouter as Router } from "react-router-dom";
import api from "./services/api";
import {Container, CssBaseline, Grid} from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import TopicOverview from "./components/TopicOverview";


function App() {
	const [user, setUser] = useState(null);
	const [topics, setTopics] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		api.login("joflaverty0@businessinsider.com", "upfsXLy8VA4")
			.then(user => {
				if (user) {
					console.log(user);
					api.getOwnerTopics(user)
						.then(topics => {
							if (topics) {
								// console.log(topics);
								setTopics(topics);
							}
						})
					setUser(user);
				}
			});
	}, []);
	return (
		<React.Fragment>
			<CssBaseline />
			<Container fixed sx={{ width: 800 }}>
				{topics.map((topicOverview, key) => {
					return <TopicOverview key={key} topicOverview={topicOverview}/>;
				})}
			</Container>
		</React.Fragment>
	);
}

export default App;
