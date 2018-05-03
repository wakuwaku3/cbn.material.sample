import * as React from "react";
import * as ReactDOM from "react-dom";
import "typeface-roboto";
import { AppMain } from "./app/masters/app-main";

export const render = () => {
  ReactDOM.render(<AppMain />, document.getElementById("root") as HTMLElement);
};
render();
