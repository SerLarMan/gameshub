export const options = {
  boardWidth: 8,
  boardHeight: 8,
  mines: 10,
};

export function resetOptions() {
  options.boardWidth = 8;
  options.boardHeight = 8;
  options.mines = 10;
}

export function markMine() {
  options.mines -= 1;
}

export function unMarkMine() {
  options.mines += 1;
}
