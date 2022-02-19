import React from "react";
import {Container, CssBaseline} from "@mui/material";
import TopicOverview from "./TopicOverview";


export default function TopicOverviewList({ topicOverviews }) {
	return <>
		<React.Fragment>
			<CssBaseline/>
			<Container fixed sx={{width: 800}}>
				{topicOverviews.map((topicOverview, key) => {
					return <TopicOverview key={key} topicOverview={topicOverview}/>;
				})}
			</Container>
		</React.Fragment>
	</>
}