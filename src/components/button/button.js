import "./button.scss";

export function setUpButton(icon, text, action) {
  const div = document.createElement("div");
  div.classList.add("button");
  div.addEventListener("click", action);

  const i = document.createElement("i");
  i.className = icon;

  const span = document.createElement("span");
  span.textContent = text;

  div.append(i);
  div.append(span);
  return div;
}
