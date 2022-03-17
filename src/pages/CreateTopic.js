import React, {useEffect, useState} from "react"
import useChangeRoute from "../hooks/useChangeRoute";
import TopicEditor from "../components/TopicEditor";
import {getUserFromLocalStorage} from "../utils/helpers";



export default function CreateTopic({user, setUser}) {
	const [isLoaded, setIsLoaded] = useState(null);

	const changeRoute = useChangeRoute();

	useEffect(() => {
		if (!isLoaded || !user) {
			setUser(getUserFromLocalStorage());
			setIsLoaded(true);
		}
		if (!user && isLoaded) {
			changeRoute("/dashboard");
		}
	})

	return (
		<div>
			<h1>Create new topic</h1>
			<TopicEditor user={user} isNewTopic={true} oldTopic={null}/>
		</div>
	)
}