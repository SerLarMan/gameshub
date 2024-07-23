import { setUpGameOption } from "../gameOption/gameOption";

import "./gameOptionContainer.scss";

export function setUpGameOptionContainer(component) {
  component.textContent = "";

  const section = document.createElement("section");

  const h2 = document.createElement("h2");
  h2.textContent = "ELIGE UN JUEGO";
  section.append(h2);

  const div = document.createElement("div");
  div.classList.add("gameOptionContainer");
  div.append(setUpGameOption("../../../resources/wordle.png", "Wordle"));
  div.append(setUpGameOption("../../../resources/buscaminas.png", "Busca Minas"));
  div.append(setUpGameOption("../../../resources/3raya.png", "3 en Raya"));
  section.append(div);

  component.append(section);
  return component;
}
