import React, {useState} from "react"
import {Alert, Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import api from "../services/api";
import AudioRecorder from "./AudioRecorder";

export default function AnswerEditor({setAreAnswersLoaded, oldAnswer, isNewAnswer, topicUniqId}) {
	
	const [errorMessage, setErrorMessage] = useState("");
	const [recordFile, setRecordFile] = useState(null);

	function handleSubmit() {
		
		let newAnswer = new FormData();
		if (!recordFile) {
			setErrorMessage("Record file is empty. Create one!");
			return;
		}
		let commentar_input = document.getElementById("__ANSWER_commentar_input").value;

		if (commentar_input === "") {
			setErrorMessage("Commentar is empty!");
			return;
		}

		if (isNewAnswer) {
			newAnswer.append("commentar", commentar_input);
			newAnswer.append("topic_uniq_id", topicUniqId);
			newAnswer.append("file", recordFile);
		} else {
			console.log("TODO");
		}

		api.sendAnswerToServer(isNewAnswer, isNewAnswer ? newAnswer : oldAnswer)
			.then(response => {
				if (response["status"] === "success") {
					setErrorMessage("");
					handleClear();
					setAreAnswersLoaded(false);
				} else {
					setErrorMessage(response["message"])
				}
			});
	}

	function handleClear() {
		document.getElementById("__ANSWER_commentar_input").value = "";
	}

	return (
		<div>
			<h2>Add new answer</h2>
			<Box
				sx={{
					display: "flex", flexDirection: "column",
					p: 1, m: 1,
					bgcolor: "background.paper", borderRadius: 1,
				}}
			>
				<AudioRecorder setRecordFile={setRecordFile}/>
				<TextField sx={{margin: 1}} id="__ANSWER_commentar_input" label="Commentar" required={true}/>
			</Box>
			{errorMessage ? <Alert severity="error"> {errorMessage} </Alert> : <></>}
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					p: 1,
					m: 1,
					bgcolor: "background.paper",
					borderRadius: 1,
				}}
			>
				<Button onClick={handleSubmit}>Submit</Button>
				<Button onClick={handleClear}>Clear</Button>
			</Box>
		</div>
	)
}
