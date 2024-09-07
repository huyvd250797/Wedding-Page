//* tool tip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Show btn Send
const registryWishInputFocus = () => {
  let getBtnSend = document.getElementById("registryBtnSend");
  getBtnSend.classList.remove("opacity-0");
};

// Hide btn Send
const registryWishInputBlur = () => {
  let getBtnSend = document.getElementById("registryBtnSend");
  getBtnSend.classList.add("opacity-0");
};

//!  --------------------------- Parallax scroll -------------------------- */

let paraScrollItems = document.querySelectorAll(".item-paraScroll");
document.addEventListener("scroll", (e) => {
  paraScrollItems.forEach((item) => {
    if (item.offsetTop - window.scrollY < 350) {
      item.classList.add("active");
    }
  });
});
