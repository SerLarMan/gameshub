import "./toast.scss";

export function setUpToast() {
  const div = document.createElement("div");
  div.classList.add("toast");

  return div;
}

/**
 * Función que muestra el toast
 * @param {*} text mensaje del toast
 */
export function showToast(text) {
  const toast = document.querySelector(".toast");
  toast.textContent = text;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
