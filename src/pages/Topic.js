import React, {useEffect, useState} from "react";
import api from "../services/api";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";
import AnswerViewList from "../components/AnswerViewList";
import TopicView from "../components/TopicView";
import {getUserFromLocalStorage} from "../utils/helpers";
import AnswerEditor from "../components/AnswerEditor";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
		<Paper
			sx={{
				p: 1, margin: "auto", maxWidth: 700, flexGrow: 1,
				// backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1A2027" : "#fff",
			}}
		>
			{
				currentTopic ?
					<>
						<Box sx={{p: 1, mb: 2, borderBottom: "1px solid grey" }}>
							<TopicView user={user} topicOverview={currentTopic}/>
						</Box>
						<Box sx={{p: 1, mb: 2, borderBottom: "1px solid grey" }}>
							{
								currentAnswers.length > 0 ?
									<>
										<Typography variant="h5" component="div" sx={{mb: 1}}>
											Answers
										</Typography>
										<AnswerViewList
											user={user} answers={currentAnswers}
											setAreAnswersLoaded={setAreAnswersLoaded}
										/>
									</>
									: <></>
							}
						</Box>
						{ user ?
							<>
								<AnswerEditor
									user={user} setAreAnswersLoaded={setAreAnswersLoaded}
									isNewAnswer={true} topicUniqId={topicUniqId}
								/>
							</>
							: <></>

						}
					</>
					: <></>
			}
		</Paper>
	</>;
}