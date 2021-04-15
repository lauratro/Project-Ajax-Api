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
console.log(showBtn);

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
  showBtn.addEventListener("click", function () {
    hideText.classList.toggle("show-text");
    showBtn.innerHTML = "Show Less";
    if (!hideText.classList.contains("show-text")) {
      showBtn.innerHTML = "Show more";
    }
  });
};
cocktailPicture();
