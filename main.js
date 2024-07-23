import { setUpGameOptionContainer } from "./src/components/gameOptionContainer/gameOptionContainer";
import { setUpHeader } from "./src/components/header/header";

import "./src/styles/global.scss";

if (!localStorage.points) {
  localStorage.points = 0;
}

const app = document.querySelector("#app");

const header = document.createElement("header");
const main = document.createElement("main");

app.append(setUpHeader(header));
app.append(setUpGameOptionContainer(main));
