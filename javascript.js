//? --------------------- Khai báo độ phân giải màn hình --------------------- */
let largePc = window.matchMedia("(min-width: 1900px)");
let pc = window.matchMedia("(min-width: 1024px)");
let tabletPC = window.matchMedia("(min-width: 740px)");
let tablet = window.matchMedia("(min-width: 740px) and (max-width: 1023px)");
let mobile = window.matchMedia("(max-width: 1023px)");

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

//? Nếu độ phân giải màn hình là PC, thì thực hiện animation PC
if (pc.matches) {
  // common
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
      if (item.offsetTop - window.scrollY < 500) {
        item.classList.add("active");
      }
    });
  });

  // PHOTO
  let paraScrollItemsPhoto = document.querySelectorAll(
    ".item-paraScroll-photo"
  );
  document.addEventListener("scroll", (e) => {
    paraScrollItemsPhoto.forEach((item) => {
      if (item.offsetTop - window.scrollY < 1100) {
        item.classList.add("active");
        sequenceDisplay();
      }
    });
  });
}

//TODO --------------------------------- MOBILE --------------------------------- */

//? Nếu độ phân giải màn hình là Mobile, thì thực hiện animation Mobile
else if (mobile.matches) {
  // option1
  let paraScrollItems = document.querySelectorAll(".item-paraScroll");
  document.addEventListener("scroll", (e) => {
    paraScrollItems.forEach((item) => {
      if (item.offsetTop - window.scrollY < 600) {
        item.classList.add("active");
      }
    });
  });

  // option2
  let paraScrollItems2 = document.querySelectorAll(".item-paraScroll2");
  document.addEventListener("scroll", (e) => {
    paraScrollItems2.forEach((item) => {
      if (item.offsetTop - window.scrollY < 600) {
        item.classList.add("active");
      }
    });
  });

  // option3
  let paraScrollItems3 = document.querySelectorAll(".item-paraScroll3");
  document.addEventListener("scroll", (e) => {
    paraScrollItems3.forEach((item) => {
      if (item.offsetTop - window.scrollY < 400) {
        item.classList.add("active");
      }
    });
  });

  // option4
  let paraScrollItems4 = document.querySelectorAll(".item-paraScroll4");
  document.addEventListener("scroll", (e) => {
    paraScrollItems4.forEach((item) => {
      if (item.offsetTop - window.scrollY < 300) {
        item.classList.add("active");
      }
    });
  });

  // option5
  let paraScrollItems5 = document.querySelectorAll(".item-paraScroll5");
  document.addEventListener("scroll", (e) => {
    paraScrollItems5.forEach((item) => {
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
      if (item.offsetTop - window.scrollY < 700) {
        item.classList.add("active");
      }
    });
  });
  // PHOTO
  let paraScrollItemsPhoto = document.querySelectorAll(
    ".item-paraScroll-photo"
  );
  document.addEventListener("scroll", (e) => {
    paraScrollItemsPhoto.forEach((item) => {
      if (item.offsetTop - window.scrollY < 800) {
        item.classList.add("active");
        sequenceDisplay();
      }
    });
  });
}

// Hàm  thứ tự hiển thị
const sequenceDisplay = () => {
  let getItemPhoto = document.querySelectorAll(".photo-album-img");

  let getItem = [];

  for (let i = 1; i < 9; i++) {
    getItem.push(i * Math.floor(1 + Math.random()));
  }

  //?!! sort random index element off array getItem
  // getItem.sort(() => Math.random() - 0.5
  let randomIndexArr = [1, 2, 3, 4, 5, 6, 7, 8];

  // Tạo mảng random
  // let randomIndexArr = getItem.sort(() => Math.random() - 0.5);

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

// Hàm random thứ tự hiển thị
const randDisplay = () => {
  let getItemPhoto = document.querySelectorAll(".photo-album-img");

  let getItem = [];

  for (let i = 1; i < 9; i++) {
    getItem.push(i * Math.floor(1 + Math.random()));
  }

  //?!! sort random index element off array getItem
  // getItem.sort(() => Math.random() - 0.5

  // Tạo mảng random
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
