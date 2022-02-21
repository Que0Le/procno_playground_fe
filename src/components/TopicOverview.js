import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import Box from "@mui/material/Box";
import {ENDPOINTS} from "../utils/config";
import { createTheme, ThemeProvider } from "@material-ui/core";
import AudioPlayer from "material-ui-audio-player";
import {limitXLines} from "../utils/customStyles";
const muiTheme = createTheme({});
import {TagLinks, LanguagesPreference, AuthorNameAndTopicDateCreated} from "./TopicView"
import {Link} from "react-router-dom";

export default function TopicOverview({ user, topicOverview, limitReadText=true }) {
	// console.log(user);
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
						{/*<Link underline="hover" href={"/topic/" + topicOverview["topic_uniq_id"]} params={{user: user}}>*/}
						<Link to={{pathname: "/topic/" + topicOverview["topic_uniq_id"], state: {user: user}}}>
							<Typography>
								{topicOverview["topic_title"]}
							</Typography>
						</Link>
						<AuthorNameAndTopicDateCreated topicOverview={topicOverview}/>
						<Typography sx={{ ... (limitReadText ? limitXLines(3) : {}), fontStyle: "italic" }} variant="body2" gutterBottom>
							{topicOverview["readtext"]}
						</Typography>
						<Typography sx={{ ...limitXLines(3)}} variant="body2" color="text.secondary">
							{topicOverview["commentar"]}
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
