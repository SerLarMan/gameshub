import { setUpTresrayaTile } from "../tresrayaTile/tresrayaTile";
import { turn } from "../../utils/tresrayaUtils";

import "./tresraya.scss";

export function setUpTresraya() {
  const div = document.createElement("div");

  // El div con la información sobre de quien es el turno de jugar
  const turnCounter = document.createElement("div");
  turnCounter.classList.add("turnCounter");

  const spanLabel = document.createElement("span");
  spanLabel.textContent = "Turno del jugador ";

  const spanValue = document.createElement("span");
  spanValue.textContent = turn.player;
  spanValue.classList.add("spanValue");

  turnCounter.append(spanLabel);
  turnCounter.append(spanValue);

  const board = document.createElement("div");

  createBoard(board);

  div.append(turnCounter);
  div.append(board);
  return div;
}

/**
 * Función que crea el tablero del tres en raya lógicamente
 * @param {*} board el elemento tablero
 */
function createBoard(board) {
  let tiles = [];

  for (let i = 0; i < 3; i++) {
    let auxArray = [];
    for (let j = 0; j < 3; j++) {
      auxArray.push({ x: j, y: i });
    }
    tiles.push(auxArray);
  }

  drawBoard(tiles, board);
}

/**
 * Función que dibuja el tablero
 * @param {*} tiles las casillas del tablero
 * @param {*} board el elemento tablero
 */
function drawBoard(tiles, board) {
  for (let tileRow of tiles) {
    const row = document.createElement("div");
    row.classList.add("row");
    tileRow.forEach((tile) => {
      row.append(setUpTresrayaTile(tile));
    });

    board.append(row);
  }
}
