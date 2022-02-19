import React, {useEffect, useState} from "react";
import TopicOverviewList from "../components/TopicOverviewList";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";

export default function Home({ user }) {
	const [topics, setTopics] = useState([]);
	const [areTopicsLoaded, setAreTopicsLoaded] = useState(false);
	const changeRoute = useChangeRoute();
	// console.log(areTopicsLoaded);
	// console.log(user);

	useEffect(() => {
		// console.log(user);
		if (!user) changeRoute("/dashboard");
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
		Home
		<TopicOverviewList user={user} topicOverviews={topics}/>
	</>;
}