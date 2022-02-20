import React, {useEffect, useState} from "react";
import api from "../services/api";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";
import TopicOverview from "../components/TopicOverview";
import AnswerViewList from "../components/AnswerViewList";
import TopicView from "../components/TopicView";

export default function Topic({user}) {

	const [isTopicLoaded, setIsTopicLoaded] = useState(false);
	const [currentTopic, setCurrentTopic] = useState(null);
	const [areAnswersLoaded, setAreAnswersLoaded] = useState(false);
	const [currentAnswers, setCurrentAnswers] = useState([]);
	// const changeRoute = useChangeRoute();

	const {topicUniqId} = useParams()
	console.log(user)
	useEffect(() => {
		if (!isTopicLoaded) {
			api.getTopicByUniqID(topicUniqId)
				.then(topic => {
					if (topic) {
						// console.log(topic);
						setCurrentTopic(topic);
						setIsTopicLoaded(true);
					}
				});
		}
		if (!areAnswersLoaded) {
			api.getAnswersForTopicByTopicUniqID(topicUniqId)
				.then(answers => {
					if (answers) {
						// console.log(answers);
						setCurrentAnswers(answers);
						setAreAnswersLoaded(true);
					}
				});
		}
	});

	return <>
		<Box>
			View for single topic
		</Box>
		<Box>
			{
				currentTopic
					?
					<TopicView topicOverview={currentTopic} limitReadText={false}/>
					:
					<></>
			}
		</Box>
		<Box>
			{
				currentTopic && currentAnswers.length > 0
					?
					<>
						<AnswerViewList answers={currentAnswers}/>
					</>
					:
					<>
					</>
			}
		</Box>
	</>;
}