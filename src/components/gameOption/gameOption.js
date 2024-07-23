import { setUpGameContainer } from "../gameContainer/gameContainer";

import "./gameOption.scss";

export function setUpGameOption(image, name) {
  const container = document.createElement("article");
  container.classList.add("gameCard");
  container.addEventListener("click", () => {
    const main = document.querySelector("main");
    setUpGameContainer(main, name);
  });

  const gameImage = document.createElement("img");
  gameImage.src = image;

  const gameName = document.createElement("h3");
  gameName.textContent = name;

  container.append(gameImage);
  container.append(gameName);
  return container;
}
