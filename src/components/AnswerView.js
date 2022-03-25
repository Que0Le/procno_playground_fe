import {Button, Grid, Link} from "@mui/material";
// import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
// import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {ENDPOINTS} from "../utils/config";
import {createTheme, ThemeProvider} from "@material-ui/core";
// import AudioPlayer from "material-ui-audio-player";
import {limitXLines} from "../utils/customStyles";
import api from "../services/api";

const muiTheme = createTheme({});

const preventDefault = (event) => event.preventDefault()


function AuthorNameAndAnswerDateCreated({answer}) {
	const dateObject = new Date(answer["answer_created_at"]);
	let topicDateCreated = dateObject.getDate() + "/" + dateObject.getMonth() + "/" + dateObject.getFullYear()
	return <div>
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "left",
				typography: "body1",
				"& > :not(style) + :not(style)": {
					ml: 1,
				},
			}}
			onClick={preventDefault}
		>
			<Link underline="hover" href="#">
				<Typography variant="body2" component="div">
					{"@" + answer["user_username"]}
				</Typography></Link>
			<Typography variant="body2" component="div">
				{topicDateCreated}
			</Typography>
		</Box>
	</div>
}

export default function AnswerView({user, answer, setAreAnswersLoaded}) {

	function handleDelete(answerUniqId) {
		api.deleteAnswerByUniqId(answerUniqId)
			.then(response => {
				if (response["status"] === "success") {
					setAreAnswersLoaded(false);
				}
			});
	}

	function handleEdit() {
	}

	return <Paper
		sx={{
			p: 2,
			margin: "auto",
			maxWidth: 700,
			flexGrow: 1,
			backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		}}
	>
		<Grid container spacing={2}>
			<Grid item>
				<Box sx={{width: 200, height: 128}}>
					{/*<ThemeProvider theme={muiTheme}>*/}
					{/*	<AudioPlayer src={ENDPOINTS.getAudioRecordByFileName + answer["record_filename"]} />*/}
					{/*</ThemeProvider>*/}
				</Box>
				{/*<LanguagesPreference topicOverview={topicOverview}/>*/}
			</Grid>
			<Grid item xs={12} sm container>
				<Grid item xs container direction="column" spacing={2}>
					<Grid item xs>
						{/*<Link underline="hover" href="#">*/}
						{/*	<Typography>*/}
						{/*		{topicOverview["topic_title"]}*/}
						{/*	</Typography>*/}
						{/*</Link>*/}
						<AuthorNameAndAnswerDateCreated answer={answer}/>
						<Typography variant="body2" gutterBottom>
							{answer["commentar"]}
						</Typography>
						{/*<Typography variant="body2" color="text.secondary">*/}
						{/*	ID: 1030114*/}
						{/*</Typography>*/}
					</Grid>
					{/*<Grid item>*/}
					{/*	<TagLinks tags={topicOverview["tag_and_uniq_id_s"]} />*/}
					{/*</Grid>*/}
				</Grid>
				<Grid item>
					<Box sx={{marginLeft: 1}}>
						<Typography variant="subtitle1" component="div">
							{answer["answer_uniq_id"] + " answers"}
						</Typography>
						<Typography variant="subtitle1" component="div">
							$19.00
						</Typography>
						{
							user && user["username"] === answer["user_username"] ?
								<>
									<Box sx={{marginLeft: 1}}>
										<Button onClick={() => handleDelete(answer["answer_uniq_id"])}>Delete</Button>
									</Box>
									<Box>
										<Button onClick={handleEdit}>Edit</Button>
									</Box>
								</>
								: <></>
						}
					</Box>
				</Grid>
			</Grid>
		</Grid>
	</Paper>;
}
