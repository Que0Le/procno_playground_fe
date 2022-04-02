import React from "react";
import {Container, CssBaseline} from "@mui/material";
import AnswerView from "./AnswerView";


export default function AnswerViewList({user, answers, setAreAnswersLoaded }) {
	return <>
		<React.Fragment>
			<CssBaseline/>
			<Container fixed>
				{answers.map((answer) => {
					return <AnswerView
						key={answer["answer_uniq_id"]}
						user={user} answer={answer}
						setAreAnswersLoaded={setAreAnswersLoaded}
					/>;
				})}
			</Container>
		</React.Fragment>
	</>
}