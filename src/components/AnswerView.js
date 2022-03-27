import {Button, Grid, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import Box from "@mui/material/Box";
import {ENDPOINTS} from "../utils/config";
import api from "../services/api";
import AudioPlayer from "react-h5-audio-player";


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

	return <>
		<Grid container spacing={2}>
			<Grid item>
				<Box sx={{width: 200, height: 128}}>
					<Grid item>
						<Box>
							<AudioPlayer
								autoPlay={false}
								showJumpControls={false}
								customAdditionalControls={[]}
								src={ENDPOINTS.getAudioRecordByFileName + answer["record_filename"]}
								onPlay={e => console.log("onPlay")}
								// other props here
							/>
						</Box>
					</Grid>
				</Box>
			</Grid>
			<Grid item xs={12} sm container>
				<Grid item xs container direction="column" spacing={2}>
					<Grid item xs>
						<AuthorNameAndAnswerDateCreated answer={answer}/>
						<Typography variant="body2" gutterBottom>
							{answer["commentar"]}
						</Typography>
					</Grid>
				</Grid>
				<Grid item>

				</Grid>
				<Grid item>
					<Box>
						{/*<Typography variant="subtitle1" component="div">*/}
						{/*	{answer["answer_uniq_id"] + " answers"}*/}
						{/*</Typography>*/}
						{/*<Typography variant="subtitle1" component="div">*/}
						{/*	$19.00*/}
						{/*</Typography>*/}
						{
							user && user["username"] === answer["user_username"] ?
								<>
									<Box>
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
	</>;
}
