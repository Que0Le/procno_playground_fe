import React from "react";
import {Container, CssBaseline} from "@mui/material";
import TopicOverview from "./TopicOverview";


export default function TopicOverviewList({ user, topicOverviews }) {
	return <>
		<React.Fragment>
			<CssBaseline/>
			<Container fixed sx={{width: 800}}>
				{topicOverviews.map((topicOverview, key) => {
					return <TopicOverview key={key} user={user} topicOverview={topicOverview}/>;
				})}
			</Container>
		</React.Fragment>
	</>
}