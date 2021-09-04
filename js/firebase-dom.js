const beersList = document.querySelector(".beers");
let main = document.getElementById("main-favorite");
let logoutText = document.getElementById("logout-text");

const loggedOutlinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
  console.log("user", user)
  if (user) {
    //account info
    
    db.collection("beers")
      .doc(user.uid)
      .get()
      .then((doc) => {
      if(doc){
        const html = `
<div>Logged in as ${user.email}</div>
`;
        accountDetails.innerHTML = html;
        const favorite = `<div>${doc.data().title}</div>`;
       beersList.innerHTML = favorite;
      /*   let favoriteArray = doc.data().title.forEach((beer) => {
          <li>${beer}</li>; 
        });*/
     // beersList.innerHTML = favoriteArray;
      }
      });

    loggedInLinks.forEach((item) => {
      item.style.display = "block";
    });
    loggedOutlinks.forEach((item) => {
      item.style.display = "none";
    });
    main.style.visibility = "visible";
    logoutText.style.display = "none";
  } else {
    //hide account info
    accountDetails.innerHTML = "";
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
      <div>${beer.title}</div>
      
     
      </li>`;
      html += li;
    });
    beersList.innerHTML = html;
  } else {
    beersList.innerHTML = `<h5>Please log in to see your favourite Beers </h5>`;
  }
}; 
