import React from "react";
import {Recorder} from "react-voice-recorder"
import "react-voice-recorder/dist/index.css"
import {ChakraProvider, Grid, Image} from "@chakra-ui/react";

export default class Testing extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			audioDetails: {
				url: null,
				blob: null,
				chunks: null,
				duration: {
					h: 0,
					m: 0,
					s: 0
				}
			}
		}
	}
	handleAudioStop(data){
		// console.log(data)
		this.setState({ audioDetails: data });
	}

	handleAudioUpload(file) {
		console.log(file);
		// Download file:
		// let csvURL = window.URL.createObjectURL(file);
		// let tempLink = document.createElement("a");
		// tempLink.href = csvURL;
		// tempLink.setAttribute("download", "filename.webm");
		// tempLink.click();
		this.props.setRecordFile(file);
	}

	handleCountDown(data) {
		// console.log(data);
	}

	handleReset() {
		const reset = {
			url: null,
			blob: null,
			chunks: null,
			duration: {
				h: 0,
				m: 0,
				s: 0
			}
		};
		this.setState({ audioDetails: reset });
	}

	render() {
		return (
			<ChakraProvider resetCSS>
				<Grid templateColumns="repeat(2, 1fr)" gap={2}>
					<Image
						width="40000px"
						src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
						overflow="visible"
						backgroundColor="green.500"
					/>
					<Image height="100px" width="100px" backgroundColor="green.500" />
				</Grid>
				<Recorder
					record={true}
					title={"New recording"}
					audioURL={this.state.audioDetails.url}
					showUIAudio
					handleAudioStop={data => this.handleAudioStop(data)}
					handleAudioUpload={data => this.handleAudioUpload(data)}
					handleCountDown={data => this.handleCountDown(data)}
					handleReset={() => this.handleReset()}
					mimeTypeToUseWhenRecording={"audio/webm"} // For specific mimetype.
				/>
			</ChakraProvider>
		)
	}
}