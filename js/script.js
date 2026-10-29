const touchArea = document.getElementById("touch-area");
const counter = document.getElementById("counter");

function updateCounter(event) {
  counter.textContent = event.touches.length;
}

touchArea.addEventListener("touchstart", updateCounter, { passive: false });
touchArea.addEventListener("touchmove", updateCounter, { passive: false });
touchArea.addEventListener("touchend", updateCounter);
touchArea.addEventListener("touchcancel", updateCounter);
