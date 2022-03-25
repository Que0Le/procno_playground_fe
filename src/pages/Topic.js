import React, {useEffect, useState} from "react";
import api from "../services/api";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";
import AnswerViewList from "../components/AnswerViewList";
import TopicView from "../components/TopicView";
import {getUserFromLocalStorage} from "../utils/helpers";
import AnswerEditor from "../components/AnswerEditor";

export default function Topic() {
	const [user, setUser] = useState(null);
	const [isLoaded, setIsLoaded] = useState(null);
	const [isTopicLoaded, setIsTopicLoaded] = useState(false);
	const [currentTopic, setCurrentTopic] = useState(null);
	const [areAnswersLoaded, setAreAnswersLoaded] = useState(false);
	const [currentAnswers, setCurrentAnswers] = useState([]);

	const {topicUniqId} = useParams()

	useEffect(() => {
		if (!isLoaded || !user) {
			setUser(getUserFromLocalStorage());
			setIsLoaded(true);
		}
		if (!isTopicLoaded) {
			api.getTopicByUniqID(topicUniqId)
				.then(topic => {
					if (topic) {
						setCurrentTopic(topic);
						setIsTopicLoaded(true);
					}
				});
		}
		if (!areAnswersLoaded) {
			api.getAnswersForTopicByTopicUniqID(topicUniqId)
				.then(answers => {
					if (answers) {
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
				currentTopic ?
					<>
						<Box>
							<TopicView user={user} topicOverview={currentTopic}/>
						</Box>
						<Box>
							----------------------
						</Box>
						<Box>
							{
								currentAnswers.length > 0 ?
									<>
										<AnswerViewList answers={currentAnswers}/>
									</>
									: <></>
							}
						</Box>
					</>
					: <></>
			}
		</Box>
		{ user ?
			<>
				<AnswerEditor user={user} isNewAnswer={true} topicUniqId={topicUniqId}/>
			</>
			: <></>

		}
	</>;
}