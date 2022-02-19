import {Grid, Link} from "@mui/material";
// import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
// import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
// import ReactPlayer from "react-player"
// import ES_Voice_Clip_Male_120_SFX_Producer from  "../assets/audio/ES_Voice_Clip_Male_120_SFX_Producer.mp3"
import {ENDPOINTS} from "../utils/config";
import { createTheme, ThemeProvider } from "@material-ui/core";
import AudioPlayer from "material-ui-audio-player";
import {limitXLines} from "../utils/customStyles";
const muiTheme = createTheme({});

const preventDefault = (event) => event.preventDefault()

function TagLinks(tags) {
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
			{tags["tags"].map((tag) => {
				return <Link key={tag["tag_uniq_id"]} underline="hover" href="#">{"#" + tag["tag"]}</Link>
			})}
		</Box>
	</div>
}

function AuthorNameAndTopicDateCreated({ topicOverview }) {
	const dateObject = new Date(topicOverview["topic_created_at"]);
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
					{"@" + topicOverview["owner_username"]}
				</Typography></Link>
			<Typography variant="body2" component="div">
				{topicDateCreated}
			</Typography>
		</Box>
	</div>
}

function LanguagesPreference({ topicOverview }) {
	return <div>
		<Typography variant="body2" component="div">
			{"Source: " + topicOverview["source_language"] + " (" + topicOverview["source_level"] + ")"}
		</Typography>
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
			<Typography variant="body2">
				Target:
			</Typography>
			{topicOverview["wish_correct_languages"].map((wish_lang) => {
				return <Typography key={wish_lang} variant="body2" component="div">
					{wish_lang}
				</Typography>
			})}
		</Box>
	</div>
}

export default function TopicOverview({ topicOverview }) {
	// console.log(topicOverview);
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
				<Box sx={{ width: 200, height: 128}}>
					<ThemeProvider theme={muiTheme}>
						<AudioPlayer src={ENDPOINTS.getAudioRecordByFileName + topicOverview["record_filename"]} />
					</ThemeProvider>
				</Box>
				<LanguagesPreference topicOverview={topicOverview}/>
			</Grid>
			<Grid item xs={12} sm container>
				<Grid item xs container direction="column" spacing={2}>
					<Grid item xs>
						<Link underline="hover" href="#">
							<Typography>
								{topicOverview["topic_title"]}
							</Typography>
						</Link>
						<AuthorNameAndTopicDateCreated topicOverview={topicOverview}/>
						<Typography sx={{ ...limitXLines(3), fontStyle: "italic" }} variant="body2" gutterBottom>
							{topicOverview["readtext"]}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							ID: 1030114
						</Typography>
					</Grid>
					<Grid item>
						<TagLinks tags={topicOverview["tag_and_uniq_id_s"]} />
					</Grid>
				</Grid>
				<Grid item>
					<Box sx={{ marginLeft: 1 }}>
						<Typography variant="subtitle1" component="div">
							{topicOverview["nbr_answer"] + " answers"}
						</Typography>
						<Typography variant="subtitle1" component="div">
							$19.00
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	</Paper>;
}
