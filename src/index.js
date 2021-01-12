/* index.js */

import React from "react";
import ReactDOM from "react-dom";
import MyTimeline from "./MyTimeline.js";

const App = () => {
	return (
		<div>
			<h1>Hello, world!</h1>
			<p>This is Kenmou-men's megalomania.</p>
			<MyTimeline />
		</div>
	);
};

ReactDOM.render(
	<App />,
	document.getElementById("app")
)