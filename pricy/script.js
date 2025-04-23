document.addEventListener("DOMContentLoaded", function () {
  // Animation d'intro subtile avec un léger décalage
  const appButton = document.querySelector(".app-button");
  const startButton = document.querySelector(".start-button");

  appButton.style.opacity = "0";
  startButton.style.opacity = "0";

  setTimeout(() => {
    appButton.style.transition = "opacity 1s ease";
    appButton.style.opacity = "1";
  }, 1500);

  setTimeout(() => {
    startButton.style.transition = "opacity 1s ease";
    startButton.style.opacity = "1";
  }, 1500);
});
