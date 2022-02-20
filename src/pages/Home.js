import React, {useEffect, useState} from "react";
import TopicOverviewList from "../components/TopicOverviewList";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Home({user, setUser}) {
	const [topics, setTopics] = useState([]);
	const [areTopicsLoaded, setAreTopicsLoaded] = useState(false);
	const changeRoute = useChangeRoute();

	if (!user) changeRoute("/dashboard");
	// console.log(user)
	useEffect(() => {
		if (!user) {
			changeRoute("/dashboard");
			return;
		}
		if (areTopicsLoaded) return;
		api.getOwnerTopics(user)
			.then(topics => {
				if (topics) {
					// console.log(topics);
					setTopics(topics);
					setAreTopicsLoaded(true);
				}
			});
	});

	return <>
		<Box>
			Home
		</Box>
		{/*<Box>*/}
		{/*	<Grid sx={{ flexGrow: 1 }} container spacing={2}>*/}
		{/*		<Grid item xs={12}>*/}
		{/*			<Grid container justifyContent="center">*/}
		{/*				{[0, 1, 2].map((value) => (*/}
		{/*					<Grid key={value} item>*/}
		{/*						<Paper*/}
		{/*							sx={{*/}
		{/*								height: 140,*/}
		{/*								width: 100,*/}
		{/*								backgroundColor: (theme) =>*/}
		{/*									theme.palette.mode === "dark" ? "#1A2027" : "#fff",*/}
		{/*							}}*/}
		{/*						/>*/}
		{/*					</Grid>*/}
		{/*				))}*/}
		{/*			</Grid>*/}
		{/*		</Grid>*/}
		{/*	</Grid>*/}
		{/*</Box>*/}
		<Box>
			<TopicOverviewList user={user} topicOverviews={topics}/>
		</Box>
	</>;
}