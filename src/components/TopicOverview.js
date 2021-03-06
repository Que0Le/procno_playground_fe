import {Button, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import {ENDPOINTS} from "../utils/config";
import {limitXLines} from "../utils/customStyles";
import {TagLinks, LanguagesPreference, AuthorNameAndTopicDateCreated} from "./TopicView"
import {Link} from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import api from "../services/api";


export default function TopicOverview({ user, topicOverview, setAreTopicsLoaded, limitReadText=true }) {
	// console.log(user);

	function handleDelete(topicUniqId) {
		api.deleteTopicByUniqIdTopics(user = {user}, topicUniqId)
			.then(response => {
				console.log({response: response});
				if (response["status"] === "success") {
					setAreTopicsLoaded(false);
				}
			});
	}

	function handleEdit() {
		// TODO: implement
	}

	return <>
		<Grid container spacing={2}>
			<Grid item>
				<Box sx={{ width: 200, height: 128}}>
					<AudioPlayer
						autoPlay={false}
						showJumpControls={false}
						customAdditionalControls={[]}
						src={ENDPOINTS.getAudioRecordByFileName + topicOverview["record_filename"]}
						onPlay={e => console.log("onPlay")}
						// other props here
					/>
				<LanguagesPreference topicOverview={topicOverview}/>
				</Box>
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
						{
							user && user["username"] === topicOverview["owner_username"]
								? <>
									<Box sx={{ marginLeft: 1 }}>
										<Button onClick={() => handleDelete(topicOverview["topic_uniq_id"])}>Delete</Button>
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
	</>;
}
