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
    if (item.offsetTop - window.scrollY < 400) {
      item.classList.add("active");
    }
  });
});

// INTRODUCE
let paraScrollItemsIntro = document.querySelectorAll(
  ".item-paraScroll-introduce"
);
document.addEventListener("scroll", (e) => {
  paraScrollItemsIntro.forEach((item) => {
    if (item.offsetTop - window.scrollY < 560) {
      item.classList.add("active");
    }
  });
});

// PHOTO
let paraScrollItemsPhoto = document.querySelectorAll(".item-paraScroll-photo");
document.addEventListener("scroll", (e) => {
  paraScrollItemsPhoto.forEach((item) => {
    if (item.offsetTop - window.scrollY < 800) {
      item.classList.add("active");
      randDisplay();
    }
  });
});

// Hàm random thứ tự hiển thị
const randDisplay = () => {
  let getItemPhoto = document.querySelectorAll(".photo-album-img");

  let getItem = [];

  for (let i = 1; i < 9; i++) {
    getItem.push(i * Math.floor(1 + Math.random()));
  }

  //?!! sort random index element off array getItem
  // getItem.sort(() => Math.random() - 0.5
  let randomIndexArr = getItem.sort(() => Math.random() - 0.5);

  for (let i = 0; i < getItemPhoto.length; i++) {
    if (getItemPhoto[i].classList.contains("active")) {
      break;
    } else {
      // add class active
      getItemPhoto[i].classList.add(`active`);

      // add class delay với giá trị là giá trị index mảng random
      getItemPhoto[i].classList.add(`delay-${randomIndexArr[i]}`);
    }
    console.log(getItemPhoto[i]);
  }
};
