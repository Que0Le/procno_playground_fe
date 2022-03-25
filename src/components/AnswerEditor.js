import React, {useEffect, useState} from "react"
import {Alert, Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";
import AudioRecorder from "./AudioRecorder";

const labels = {
	"__ANSWER_commentar_input": "Commentar"
}

export default function AnswerEditor({user, setAreAnswersLoaded, oldAnswer, isNewAnswer, topicUniqId}) {
	
	const [errorMessage, setErrorMessage] = useState("");
	const [recordFile, setRecordFile] = useState(null);
	// const changeRoute = useChangeRoute();
	// console.log(recordFile)

	function handleSubmit() {
		
		let newAnswer = new FormData();
		if (!recordFile) {
			setErrorMessage("Record file is empty. Create one!");
			return;
		}
		let inputValues = {
			"commentar_input": document.getElementById("__ANSWER_commentar_input").value
		}

		let constructMessage = ""
		for (const [key, value] of Object.entries(inputValues)) {
			if (value === "") {
				constructMessage += labels[key] + ", ";
			}
		}

		if (constructMessage !== "") {
			setErrorMessage("No empty field allowed: " + constructMessage.substring(0, constructMessage.length - 2));
			return;
		}

		if (isNewAnswer) {
			// newAnswer.append("owner_uniq_id", user ? user["uniq_id"] : "");
			// newAnswer.append("record_filename", "__PLACE__HOLDER__");
			newAnswer.append("commentar", inputValues["commentar_input"]);
			newAnswer.append("topic_uniq_id", topicUniqId);
			newAnswer.append("file", recordFile);
		} else {
			console.log("TODO");
		}
		// setErrorMessage("");
		// console.log(newAnswer);

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

	useEffect(() => {
		const now = Date.now();
		Object.keys(labels).forEach(k => {
			document.getElementById(k).value = now + k;
		})
	})
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
