/* index.js */

import React from "react";
import ReactDOM from "react-dom";
import MyTimeline from "./MyTimeline.js";

const App = () => {
	return (
		<div>
			<h1>Hello, world!</h1>
			<p>I am Yuuki Toriyama. Nice to meet you</p>
			<MyTimeline />
		</div>
	);
};

ReactDOM.render(
	<App/>,
	document.getElementById("app")
)