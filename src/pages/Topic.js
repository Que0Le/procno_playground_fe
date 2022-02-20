import React, {useEffect, useState} from "react";
import TopicOverviewList from "../components/TopicOverviewList";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useParams} from "react-router-dom";

export default function Topic({user}) {

	// const [areTopicsLoaded, setAreTopicsLoaded] = useState(false);
	// const changeRoute = useChangeRoute();
	//

	const { topicUniqId } = useParams()
	console.log(topicUniqId);
	// useEffect(() => {
	// 	if (!user) {
	// 		changeRoute("/dashboard");
	// 		return;
	// 	}
	// 	if (areTopicsLoaded) return;
	// 	api.getOwnerTopics(user)
	// 		.then(topics => {
	// 			if (topics) {
	// 				// console.log(topics);
	// 				setTopics(topics);
	// 				setAreTopicsLoaded(true);
	// 			}
	// 		});
	// });

	return <>
		<Box>
			View for single topic
		</Box>
	</>;
}