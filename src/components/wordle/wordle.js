import { setUpKey } from "../key/key";
import { keys } from "../../data/keys";
import { words } from "../../data/words";

import "./wordle.scss";

export function setUpWordle() {
  const div = document.createElement("div");

  // La palabra aleatoria de cada partida
  const index = Math.floor(Math.random() * words.length);
  const randomWord = words[index].toUpperCase();

  div.append(createTable(randomWord));
  div.append(createKeyBoard());
  return div;
}

/**
 * Función que crea la tabla para introducir las letras
 * @returns
 */
function createTable(randomWord) {
  const article = document.createElement("article");
  const table = document.createElement("table");
  table.randomWord = randomWord;

  for (let i = 0; i < 6; i++) {
    const tr = document.createElement("tr");
    tr.order = i;
    for (let j = 0; j < 5; j++) {
      const td = document.createElement("td");
      const span = document.createElement("span");
      span.textContent = " ";
      td.append(span);
      tr.append(td);
    }

    table.append(tr);
  }

  article.append(table);
  return article;
}

/**
 * Función que crea el teclado con las letras
 * @returns
 */
function createKeyBoard() {
  const article = document.createElement("article");

  const firstRow = document.createElement("div");
  firstRow.classList.add("row");
  for (let i = 0; i < 10; i++) {
    firstRow.append(setUpKey(keys[i]));
  }

  const secondRow = document.createElement("div");
  secondRow.classList.add("row");
  for (let i = 10; i < 20; i++) {
    secondRow.append(setUpKey(keys[i]));
  }

  const thirdRow = document.createElement("div");
  thirdRow.classList.add("row");
  for (let i = 20; i < 27; i++) {
    thirdRow.append(setUpKey(keys[i]));
  }

  const deleteButton = document.createElement("div");
  deleteButton.append(setUpKey("", "fas fa-delete-left"));
  thirdRow.append(deleteButton);

  article.append(firstRow);
  article.append(secondRow);
  article.append(thirdRow);
  return article;
}
