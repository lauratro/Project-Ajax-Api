const beersList = document.querySelector(".beers");
let main = document.getElementById("main-favorite");
let logoutText = document.getElementById("logout-text");

const loggedOutlinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach((item) => {
      item.style.display = "block";
    });
    loggedOutlinks.forEach((item) => {
      item.style.display = "none";
    });
    main.style.visibility = "visible";
    logoutText.style.display = "none";
  } else {
    loggedInLinks.forEach((item) => {
      item.style.display = "none";
    });
    loggedOutlinks.forEach((item) => {
      item.style.display = "block";
    });
    logoutText.style.display = "block";
    main.style.visibility = "hidden";
  }
};
//setup beer list

const setupBeers = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const beer = doc.data();
      console.log(beer);
      const li = `<li>
      <div>${beer.title}, ${beer.name}</div>
     
      </li>`;
      html += li;
    });
    beersList.innerHTML = html;
  } else {
    beersList.innerHTML = `<h5>Please log in to see your favourite Beers </h5>`;
  }
};
