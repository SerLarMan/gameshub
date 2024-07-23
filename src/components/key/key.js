import { showToast } from "../toast/toast";
import { words } from "../../data/words";
import { currentRow, plusCurrentRow } from "../../utils/wordleUtils";
import { addPoints } from "../../utils/windowUtils";

import "./key.scss";

export function setUpKey(letter, icon) {
  const div = document.createElement("div");
  div.classList.add("key");
  div.addEventListener("mouseup", handleKeyClick);

  const span = document.createElement("span");
  if (letter) {
    span.textContent = letter.toUpperCase();
    span.delete = false;
  } else {
    span.className = icon;
    span.delete = true;
    div.style.width = "4em";
  }

  div.append(span);
  return div;
}

/**
 * Función que le da la funcionalidad de click a cada tecla
 * @param {*} e
 */
function handleKeyClick(e) {
  const key = e.currentTarget.children[0];

  const tdList = document
    .querySelectorAll("tr")
    [currentRow].querySelectorAll("td");
  if (!key.delete) {
    handleLetterKey(key, tdList);
  } else {
    handleDeleteKey(tdList);
  }

  const randomWord = document.querySelector("table").randomWord;
}

/**
 * Función que añade la letra pulsada a la casilla
 * @param {*} key la tecla pulsada
 * @param {*} tdList lista de casilla en la tabla
 */
function handleLetterKey(key, tdList) {
  const tdEmpty = Array.from(tdList).find(
    (td) => td.children[0].textContent === " "
  );

  if (tdEmpty) {
    tdEmpty.children[0].textContent = key.textContent;

    // Se añade la animación
    tdEmpty.classList.add("pop-in");

    // Se elimina la animación pasado un tiempo
    setTimeout(() => {
      tdEmpty.classList.remove("pop-in");
    }, 300);

    checkRowComplete(tdEmpty.parentElement);
  }
}

/**
 * Función que borra la ultima letra pulsada
 * @param {*} tdList lista de casilla en la tabla
 */
function handleDeleteKey(tdList) {
  const filledCells = Array.from(tdList).filter(
    (td) => td.children[0].textContent !== " "
  );

  if (filledCells.length > 0) {
    const lastFilled = filledCells[filledCells.length - 1];
    lastFilled.children[0].textContent = " ";
  }

  // Se vuelven a activar las letras
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    key.addEventListener("mouseup", handleKeyClick);
  });
}

/**
 * Función que comprueba si la palabra se ha completado
 * @param {*} tr fila de letras
 */
function checkRowComplete(tr) {
  if (Array.from(tr.cells).every((td) => td.children[0].textContent !== " ")) {
    // Si la palabra existe
    if (wordExists(tr)) {
      // Se añade la animación a cada td
      Array.from(tr.cells).forEach((td, index) => {
        setTimeout(() => {
          td.classList.add("scale-y");

          // Se aplican los colores después de la animación
          td.addEventListener(
            "animationend",
            function () {
              td.classList.remove("scale-y");
              checkCorrectLetters(td, index);
            },
            { once: true }
          );
        }, index * 100); // Retraso de la animación
      });
      plusCurrentRow();
    } else {
      // Se añade animación de sacudida si la palabra no existe
      Array.from(tr.cells).forEach((td, index) => {
        setTimeout(() => {
          td.classList.add("shake");

          setTimeout(() => {
            td.classList.remove("shake");
          }, 600);
        }, index * 100); // Retraso de la animación
      });

      disableAllKeysExceptDelete();
      showToast("La palabra no existe");
    }
  }
}

/**
 * Función que comprueba si la palabra existe
 * @param {*} tr fila de letras
 * @returns
 */
function wordExists(tr) {
  const actualWord = Array.from(tr.cells)
    .map((td) => td.children[0].textContent.toLowerCase())
    .join("");
  return words.includes(actualWord);
}

/**
 * Función que comrpueba si cada letra introducida está en la palabra a acertar
 * @param {*} td casilla de la fila
 * @param {*} index
 */
function checkCorrectLetters(td, index) {
  const randomWord = document.querySelector("table").randomWord;
  const chars = [...randomWord];
  const keys = document.querySelectorAll(".key");

  const keyChar = td.children[0].textContent;
  const keyElement = Array.from(keys).find(
    (key) => key.children[0].textContent === keyChar
  );

  // Se añade el color dependiendo si la letra esta o no
  if (keyChar === chars[index]) {
    setCorrect(td, keyElement);
  } else if (chars.includes(keyChar)) {
    setBadPosition(td, keyElement);
  } else {
    setWrong(td, keyElement);
  }

  // Condiciones de finalización de la partida
  const tr = td.parentElement;
  if (isRowCorrect(tr)) {
    winGame(tr);
  } else if (tr.rowIndex === 5) {
    endGame();
  }
}

/**
 * Función que marca una casilla y tecla como correcta
 * @param {*} td la casilla
 * @param {*} key la tecla
 */
function setCorrect(td, key) {
  td.classList.add("correct");
  td.style.color = "white";
  key.classList.add("correct");
  key.classList.remove("badposition", "wrong");
  key.style.color = "white";
}

/**
 * Función que marca una casilla y tecla como mal posicionada
 * @param {*} td la casilla
 * @param {*} key la tecla
 */
function setBadPosition(td, key) {
  td.classList.add("badposition");
  td.style.color = "white";
  key.classList.add("badposition");
  key.style.color = "white";
}

/**
 * Función que marca una casilla y tecla como incorrecta
 * @param {*} td la casilla
 * @param {*} key la tecla
 */
function setWrong(td, key) {
  td.classList.add("wrong");
  td.style.color = "white";
  key.classList.add("wrong");
  key.style.color = "white";
}

/**
 * Función que comprueba si todas las letras de una fila son correctas
 * @param {*} tr
 * @returns
 */
function isRowCorrect(tr) {
  return Array.from(tr.cells).every((td) => td.classList.contains("correct"));
}

/**
 * Función que deshabilita todas las teclas menos la de borrar
 */
function disableAllKeysExceptDelete() {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    if (!key.children[0].delete) {
      key.removeEventListener("mouseup", handleKeyClick);
    }
  });
}

/**
 * Función que deshabilita todas las teclas
 */
function disableAllKeys() {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => key.removeEventListener("mouseup", handleKeyClick));
}

/**
 * Función que se encarga de la condición de victoria en el juego
 */
function winGame(tr) {
  disableAllKeys();

  Array.from(tr.cells).forEach((td, index) => {
    setTimeout(() => {
      td.classList.add("jump");

      td.addEventListener(
        "animationend",
        function () {
          td.classList.remove("jump");
        },
        { once: true }
      );
    }, index * 100);
  });

  showToast("¡Enhorabuena, has acertado! Has ganado 100 puntos.");

  addPoints(100);
}

/**
 * Función que se encarga de la condición de derrota en el juego
 */
function endGame() {
  disableAllKeys();
  showToast("No has conseguido acertar");
}
