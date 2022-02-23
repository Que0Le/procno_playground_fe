import React from "react"
import useChangeRoute from "../hooks/useChangeRoute";
import TopicEditor from "../components/TopicEditor";



export default function CreateTopic({user, setUser}) {
	const changeRoute = useChangeRoute();


	if (!user) changeRoute("/dashboard");
	return (
		<div>
			<h1>Create new topic</h1>
			<TopicEditor user={user} isNewTopic={true} oldTopic={null}/>
		</div>
	)
}