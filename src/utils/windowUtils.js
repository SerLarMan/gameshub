export function addPoints(points) {
  localStorage.points = Number(localStorage.points) + points;

  const span = document.querySelector(".pointsValue");
  span.textContent = localStorage.points;
}
