import {Grid} from "@mui/material";
// import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import Box from "@mui/material/Box";
import {ENDPOINTS} from "../utils/config";
import {limitXLines} from "../utils/customStyles";
import {Link} from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";

const preventDefault = (event) => event.preventDefault()

export function TagLinks(tags) {
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
				return <Link
					key={tag["tag_uniq_id"]} underline="hover"
					to={{pathname: "/tag/" + tag["tag"]}}>
					{"#" + tag["tag"]}
				</Link>
			})}
		</Box>
	</div>
}

export function AuthorNameAndTopicDateCreated({topicOverview}) {
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
			<Link underline="hover" to={{pathname: "/user/" + topicOverview["owner_username"]}}>
				<Typography variant="body2" component="div">
					{"@" + topicOverview["owner_username"]}
				</Typography></Link>
			<Typography variant="body2" component="div">
				{topicDateCreated}
			</Typography>
		</Box>
	</div>
}

export function LanguagesPreference({topicOverview}) {
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

export default function TopicView({user, topicOverview, limitReadText = true}) {
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
		<Box sx={{width: "100%", height: 66}}>
			<AudioPlayer
				autoPlay={false}
				showJumpControls={false}
				customAdditionalControls={[]}
				src={ENDPOINTS.getAudioRecordByFileName + topicOverview["record_filename"]}
				onPlay={e => console.log("onPlay")}
				// other props here
			/>
		</Box>
		<Grid container spacing={2}>
			<Grid item xs={12} sm container>
				<Grid item xs container direction="column" spacing={2}>
					<Grid item xs>
						<Link to={{pathname: "/topic/" + topicOverview["topic_uniq_id"], state: {user: user}}}>
							<Typography>
								{topicOverview["topic_title"]}
							</Typography>
						</Link>
						<AuthorNameAndTopicDateCreated topicOverview={topicOverview}/>
						<Grid item>
							<LanguagesPreference topicOverview={topicOverview}/>
						</Grid>
						<Typography sx={{...(limitReadText ? limitXLines(3) : {}), fontStyle: "italic"}} variant="body2"
									gutterBottom>
							{topicOverview["readtext"]}
						</Typography>
						<Typography sx={{...limitXLines(3)}} variant="body2" color="text.secondary">
							{topicOverview["commentar"]}
						</Typography>
					</Grid>
					<Grid item>
						<TagLinks tags={topicOverview["tag_and_uniq_id_s"]}/>
					</Grid>
				</Grid>
				<Grid item>
					<Box sx={{marginLeft: 1}}>
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
