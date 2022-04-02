import React from "react";
import {Container, CssBaseline} from "@mui/material";
import TopicOverview from "./TopicOverview";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";


export default function TopicOverviewList({ user, topicOverviews, setAreTopicsLoaded }) {
	return <>
		<React.Fragment>
			<CssBaseline/>
				<Paper
					sx={{
						p: 2,
						margin: "auto",
						maxWidth: 800,
						flexGrow: 1,
						backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1A2027" : "#fff",
					}}
				>
					{topicOverviews.map((topicOverview) => {
						return <TopicOverview
							key={topicOverview["topic_uniq_id"]}
							user={user}
							topicOverview={topicOverview}
							setAreTopicsLoaded={setAreTopicsLoaded}
						/>;
					})}
			</Paper>
		</React.Fragment>
	</>
}