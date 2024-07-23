export const turn = {
  player: 1,
  value: "X",
};

export function resetTurn() {
  turn.player = 1;
  turn.value = "X";
}

export function nextTurn() {
  if (turn.player == 1) {
    turn.player = 2;
    turn.value = "O";
  } else {
    turn.player = 1;
    turn.value = "X";
  }
}
