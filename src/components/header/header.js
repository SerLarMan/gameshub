import "./header.scss";

export function setUpHeader(component) {
  component.textContent = "";

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("headerContainer");

  const titleContainer = document.createElement("div")
  titleContainer.classList.add("titleContainer")

  const h1 = document.createElement("h1");
  h1.textContent = "Games Hub";

  const i = document.createElement("i");
  i.className = "fas fa-gamepad";

  titleContainer.append(i)
  titleContainer.append(h1)

  const pointsContainer = document.createElement("div");
  pointsContainer.classList.add("pointsContainer");

  const label = document.createElement("span");
  label.textContent = "Puntos: ";
  label.classList.add("pointsLabel");

  const value = document.createElement("span");
  value.textContent = localStorage.points;
  value.classList.add("pointsValue");

  pointsContainer.append(label);
  pointsContainer.append(value);

  headerContainer.append(titleContainer);
  headerContainer.append(pointsContainer);

  component.append(headerContainer);
  return component;
}
