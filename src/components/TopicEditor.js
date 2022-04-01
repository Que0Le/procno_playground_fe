import React, {useEffect, useState} from "react"
import {Alert, Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";
import AudioRecorder from "./AudioRecorder";

const labels = {
	"title_input": "Topic title",
	"source_languages_input": "Source language",
	"source_level_input": "Source language level",
	"wish_languages_input": "Wish languages",
	"tags_input": "Tags",
	"readtext_input": "Read text",
	"commentar_input": "Commentar"
}

export default function TopicEditor({user, oldTopic, isNewTopic, changeRouteToNewTopic=true}) {
	const [errorMessage, setErrorMessage] = useState("");
	const [recordFile, setRecordFile] = useState(null);
	const changeRoute = useChangeRoute();

	function handleSubmit() {

		let newTopic = new FormData();
		if (!recordFile) {
			setErrorMessage("Record file is empty. Create one!");
			return;
		}
		let inputValues = {
			"title_input": document.getElementById("title_input").value,
			"source_languages_input": document.getElementById("source_languages_input").value,
			"source_level_input": document.getElementById("source_level_input").value,
			"wish_languages_input": document.getElementById("wish_languages_input").value,
			"tags_input": document.getElementById("tags_input").value,
			"readtext_input": document.getElementById("readtext_input").value,
			"commentar_input": document.getElementById("commentar_input").value
		}
		let constructMessage = ""
		for (const [key, value] of Object.entries(inputValues)) {
			// console.log(`${key}: ${value}`);
			if (value === "") {
				constructMessage += labels[key] + ", ";
			}
		}
		if (constructMessage !== "") {
			setErrorMessage("No empty field allowed: " + constructMessage.substring(0, constructMessage.length - 2));
			return;
		}

		if (isNewTopic) {
			newTopic.append("topic_title", inputValues["title_input"]);
			newTopic.append("source_language", inputValues["source_languages_input"]);
			newTopic.append("source_level", inputValues["source_level_input"]);
			newTopic.append("source_language", inputValues["source_languages_input"]);
			newTopic.append("owner_uniq_id", user ? user["uniq_id"] : "");
			newTopic.append("owner_username", user ? user["username"] : "");
			newTopic.append("source_language", inputValues["source_languages_input"]);
			newTopic.append("wish_correct_languages", inputValues["wish_languages_input"]);
			newTopic.append("tags", inputValues["tags_input"]);
			newTopic.append("readtext", inputValues["readtext_input"]);
			newTopic.append("record_filename", "__PLACE__HOLDER__");
			newTopic.append("commentar", inputValues["commentar_input"]);
			newTopic.append("file", recordFile);
		} else {
			// TODO
		}

		api.sendTopicToServer(user={user}, isNewTopic, isNewTopic ? newTopic : oldTopic)
			.then(response => {
				if (response["status"] === "success") {
					setErrorMessage("");
					if (changeRouteToNewTopic) {
						changeRoute("/topic/" + response["topic"]["topic_uniq_id"]);
					}
				} else {
					setErrorMessage(response["message"])
				}
			});
	}

	function handleClear() {
		document.getElementById("title_input").value = "";
		document.getElementById("source_languages_input").value = "";
		document.getElementById("source_level_input").value = "";
		document.getElementById("wish_languages_input").value = "";
		document.getElementById("tags_input").value = "";
		document.getElementById("readtext_input").value = "";
		document.getElementById("commentar_input").value = "";
	}

	useEffect(() => {
		// const now = Date.now();
		// Object.keys(labels).forEach(k => {
		// 	// console.log(k)
		// 	document.getElementById(k).value = now;
		// })
	})
	return (
		<div>
			<h1>Topic editor</h1>
			<Box
				sx={{
					display: "flex", flexDirection: "column",
					p: 1, m: 1,
					bgcolor: "background.paper", borderRadius: 1,
				}}
			>
				<AudioRecorder setRecordFile={setRecordFile}/>
				<TextField sx={{margin: 1}} id="readtext_input" label="Read text" multiline minRows={2} maxRows={10} required={true}/>
				<TextField sx={{margin: 1}} id="title_input" label="Topic title" required={true}/>
				<TextField sx={{margin: 1}} id="source_languages_input" label="Source language" required={true}/>
				<TextField sx={{margin: 1}} id="source_level_input" label="Source language level" required={true}/>
				<TextField sx={{margin: 1}} id="wish_languages_input" label="Wish languages" required={true}/>
				<TextField sx={{margin: 1}} id="tags_input" label="Tags" required={true}/>
				<TextField sx={{margin: 1}} id="commentar_input" label="Commentar" required={true}/>
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
