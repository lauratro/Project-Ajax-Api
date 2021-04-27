let contactTitle = document.getElementById("contact");
let phone = document.getElementById("phone");
let mail = document.getElementById("mail");
let allContactText = Array.from(document.querySelectorAll(".contact-text"));
let contactText = () => {
  window.addEventListener("load", function () {
    allContactText.forEach((t) => {
      t.classList.toggle("show-text");
    });
  });
};
contactText();
