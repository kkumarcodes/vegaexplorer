// -- React and related libs
import React from "react";
import { render } from "react-dom";

// -- App
import App from "./App";

// -- Service Worker
import * as serviceWorker from "./serviceWorker";

// -- Rendering Application
render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
