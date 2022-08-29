import { render } from "react-dom";
import { RCA } from "./rca";

const Hello = () => <h1>Hello</h1>;

const target = document.getElementById("root");
target?.style.setProperty("height", "100%");

render(<RCA />, target);
