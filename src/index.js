/* index.js */

import React from "react";
import ReactDOM from "react-dom";

const App = () => {
	return (
		<div>
			<h1>Hello, world!</h1>
			<p>I am Yuuki Toriyama. Nice to meet you</p>
		</div>
	);
};

ReactDOM.render(
	<App/>,
	document.getElementById("app")
)