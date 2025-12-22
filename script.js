const buttons = document.querySelectorAll(".open-popup");
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".close");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const popupId = button.getAttribute("data-popup");
    document.getElementById(popupId).style.display = "block";
  });
});

closeButtons.forEach((close) => {
  close.addEventListener("click", () => {
    close.parentElement.parentElement.style.display = "none";
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
