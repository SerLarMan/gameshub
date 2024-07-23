import { setUpGameOptionContainer } from "../gameOptionContainer/gameOptionContainer";
import { setUpBuscaminas } from "../buscaminas/buscaminas";
import { setUpTresraya } from "../tresraya/tresraya";
import { setUpWordle } from "../wordle/wordle";
import { setUpToast } from "../toast/toast";
import { setUpButton } from "../button/button";
import { resetCurrentRow } from "../../utils/wordleUtils";
import { resetTurn } from "../../utils/tresrayaUtils";
import { resetOptions } from "../../utils/buscaminasUtils";

import "../../styles/global.scss";
import "./gameContainer.scss";

export function setUpGameContainer(component, name) {
  component.textContent = "";

  const section = document.createElement("section");

  const h2 = document.createElement("h2");
  h2.textContent = name.toUpperCase();
  section.append(h2);

  const buttonArticle = document.createElement("article");
  buttonArticle.classList.add("buttonArticle");

  const buttonArticleh3 = document.createElement("h3");
  buttonArticleh3.classList.add("none");
  buttonArticle.append(buttonArticleh3);

  buttonArticle.append(
    setUpButton("fas fa-arrow-left", "Atrás", () => {
      setUpGameOptionContainer(component);
    })
  );

  buttonArticle.append(
    setUpButton("fas fa-repeat", "Volver a jugar", () => {
      setUpGameContainer(component, name);
    })
  );

  section.append(buttonArticle);

  resetCurrentRow();
  resetTurn();
  resetOptions();

  const gameArticle = document.createElement("article");
  gameArticle.classList.add("gameArticle");

  const gameArticleh3 = document.createElement("h3");
  gameArticleh3.classList.add("none");
  gameArticle.append(gameArticleh3);

  switch (name) {
    case "Wordle":
      gameArticle.append(setUpWordle());
      break;
    case "Busca Minas":
      gameArticle.append(setUpBuscaminas());
      break;
    case "3 en Raya":
      gameArticle.append(setUpTresraya());
  }

  section.append(gameArticle);
  component.append(section);
  component.append(setUpToast());
  return component;
}
