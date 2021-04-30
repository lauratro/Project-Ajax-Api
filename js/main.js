let central = document.getElementById("central-pic");
let rightPic = document.querySelector(".cocktail-viola-right");
let leftPic = document.querySelector(".cocktail-viola-left");
let parallax = document.querySelector(".parallax");
let body = document.querySelector("body");
let parallaxTexts = document.querySelectorAll(".paral-text");
let paraText1 = document.querySelector(".parallaxText1");
let paraText2 = document.querySelector(".parallaxText2");
let showBtn = document.querySelector(".show-btn");
let hideText = document.querySelector(".hide-text");
let hideTexts = Array.from(document.querySelectorAll(".hide-text-3"));
let cardBtns = Array.from(document.querySelectorAll(".show-card-btn"));
console.log(cardBtns);
console.log(hideTexts);

let cocktailPicture = () => {
  //Cutted Picture home page
  central.addEventListener("mouseover", function () {
    leftPic.classList.toggle("close");
    rightPic.classList.toggle("close");
  });

  window.addEventListener("load", function () {
    parallax.classList.add("parallaxScroll");
    //paraText1.classList.toggle("parallaxTextShow");
    paraText2.classList.toggle("parallaxTextShow");
  });

  //Card Buttons

  for (let i = 0; i < cardBtns.length; i++) {
    cardBtns[i].addEventListener("click", () => {
      cardBtns[i].innerHTML = "Show Less";

      hideTexts[i].classList.toggle("show-text");
      if (!hideTexts[i].classList.contains("show-text")) {
        cardBtns[i].innerHTML = "Show more";
      }
    });
  }
};
cocktailPicture();
