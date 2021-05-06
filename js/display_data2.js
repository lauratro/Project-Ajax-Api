//Table Variables
let tableResult = document.getElementById("tableResult");
let bodyTable = document.getElementById("bodyTable");
let tot = document.getElementById("tot");
let filterBoth = [];

//Table
let displayResults = (data, index) => {
  bodyTable.innerHTML = "";
  tableResult.classList.toggle("showTable");
  let numData = "";
  tot.innerHTML = data.length;
  let modalContainer = document.getElementById("modal-container");
  let resultNumber = document.getElementById("resultNumber");

  data.forEach((d, index) => {
    let tr = document.createElement("tr");
    tr.classList.add("internal-tr");
    let td0 = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td2.classList.add("font-weight-bold");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    let td5 = document.createElement("td");

    let td6 = document.createElement("td");

    let td7 = document.createElement("td");
    let td7form = document.createElement("form");
    let td7btn = document.createElement("button");
    let td7input = document.createElement("input");

    let btnTable = document.createElement("button");

    //Description
    let pDescr = document.createElement("p");
    pDescr.classList.add("descrBtn");

    pDescr.innerHTML = "...Read More";
    let td4one = document.createElement("span");
    td4one.classList.add("first-descr");
    td4one.innerHTML = d.description.substring(0, 70);
    td4.appendChild(td4one);
    let td4due = document.createElement("span");

    td4due.innerHTML = d.description;
    td4due.classList.add("hide-descr");
    td4due.classList.add("sec-descr");
    //Button Modal
    let btnModal = document.createElement("button");
    btnModal.innerHTML = "Show More";

    btnModal.setAttribute("data-toggle", "modal");
    btnModal.setAttribute("data-target", `#modal${d.id}`);
    btnModal.classList.add("button-food");

    //Modal structure
    let externalDiv = document.createElement("div");
    externalDiv.classList.add("modal");
    externalDiv.classList.add("fade");
    externalDiv.setAttribute("id", `modal${d.id}`);
    externalDiv.setAttribute("tabindex", "-1");
    externalDiv.setAttribute("aria-labelledby", "exampleModalLabel");
    externalDiv.setAttribute("aria-hidden", "true");
    modalContainer.appendChild(externalDiv);
    let dialogDiv = document.createElement("div");
    dialogDiv.classList.add("modal-dialog");
    externalDiv.appendChild(dialogDiv);
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("modal-content");
    dialogDiv.appendChild(contentDiv);
    let headerDiv = document.createElement("div");
    headerDiv.classList.add("modal-header");
    contentDiv.appendChild(headerDiv);
    let h5Title = document.createElement("h5");
    h5Title.classList.add("modal-title");
    h5Title.innerHTML = "Food Pairing";
    h5Title.setAttribute("id", "exampleModalLabel");
    headerDiv.appendChild(h5Title);
    let closeButton = document.createElement("button");
    closeButton.classList.add("close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    headerDiv.appendChild(closeButton);
    let spanX = document.createElement("span");
    spanX.setAttribute("aria-hidden", "true");
    spanX.innerHTML = "&times;";
    closeButton.appendChild(spanX);
    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("modal-body");
    bodyDiv.classList.add("px-3");
    contentDiv.appendChild(bodyDiv);
    let pName = document.createElement("p");
    pName.innerHTML = d.name;
    pName.classList.add("font-weight-bold");
    bodyDiv.appendChild(pName);
    let flexDiv = document.createElement("div");
    bodyDiv.appendChild(flexDiv);
    flexDiv.classList.add("displ-flex-around");
    let ulFood = document.createElement("ul");
    ulFood.classList.add("mx-3");
    let foodArray = d.food_pairing;
    foodArray.forEach((f) => {
      let li = document.createElement("li");
      li.innerHTML = f;
      ulFood.appendChild(li);
    });

    flexDiv.appendChild(ulFood);
    let picBeer = document.createElement("img");
    picBeer.classList.add("pictureModal");
    if (d.image_url != "null") {
      picBeer.setAttribute("src", d.image_url);
    } else {
      picBeer.innerHTML = "No picture available";
    }
    flexDiv.appendChild(picBeer);

    let footerDiv = document.createElement("div");
    footerDiv.classList.add("modal-footer");
    contentDiv.appendChild(footerDiv);
    let footerCloseBtn = document.createElement("button");
    footerCloseBtn.setAttribute("type", "button");
    footerCloseBtn.classList.add("btn");
    footerCloseBtn.classList.add("btn-secondary");
    footerCloseBtn.setAttribute("data-dismiss", "modal");
    footerCloseBtn.innerHTML = "Close";
    footerDiv.appendChild(footerCloseBtn);
    //end modal

    numData++;
    td0.innerHTML = numData;
    resultNumber.innerHTML = "Search Results: " + numData;
    td0.setAttribute("data-label", "Beer:");
    td1.innerHTML = d.id;
    td1.setAttribute("data-label", "Id");
    td2.innerHTML = d.name;
    td2.setAttribute("data-label", "Name");
    td3.innerHTML = d.abv;
    td3.setAttribute("data-label", "Volume of Alcohol (%)");

    td5.innerHTML = d.first_brewed;
    td5.setAttribute("data-label", "First Brewed");

    //favorite input
    td7form.appendChild(td7btn);
    td7form.appendChild(td7input);
    td7.appendChild(td7form);
    td7form.classList.add("formFav");
    td7form.setAttribute("id", "form" + index);
    td7input.setAttribute("type", "text");
    td7input.setAttribute("value", d.name);
    td7input.classList.add("inputForm");
    td7input.setAttribute("id", d.name);
    td7btn.setAttribute("type", "submit");
    td7btn.setAttribute("value", "Favorite");
    td7btn.innerHTML = "Favorite";
    td7btn.classList.add("favorite");
    //create beer on user profile
    td7btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(td7btn);

      if (!td7btn.classList.contains("color")) {
        td7btn.classList.add("color");
        let name = document.getElementById(d.name).value;

        console.log(name);
        let data = {
          title: name,
        };

        var user = firebase.auth().currentUser.uid;
        console.log("user", user);

        db.collection("users")
          .doc(user)
          .update({ title: firebase.firestore.FieldValue.arrayUnion(name) })
          .then(() => {
            console.log("Document successfully written!");
          });
      }
    });

    btnTable.innerHTML = "Show More";
    btnTable.classList.add("button-food");
    btnTable.classList.add("click-btn");
    td4.setAttribute("data-label", "Description");

    td6.classList.add("hide-food");
    td6.setAttribute("data-label", "Food Pairing");
    td6.classList.add("food-td");
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    td4.appendChild(td4due);
    td4.appendChild(pDescr);
    tr.appendChild(td6);
    tr.appendChild(btnModal);
    tr.appendChild(td7);
    bodyTable.appendChild(tr);
  });
  //create new beer
  let allInput = document.querySelectorAll;
  //Description show more and Less
  let allSecDescr = Array.from(document.querySelectorAll(".sec-descr"));
  let allFirstDescr = Array.from(document.querySelectorAll(".first-descr"));
  let allBtnDescr = Array.from(document.querySelectorAll(".descrBtn"));
  for (let i = 0; i < allBtnDescr.length; i++) {
    allBtnDescr[i].addEventListener("click", () => {
      allBtnDescr[i].innerHTML = "Show Less";
      allFirstDescr[i].classList.toggle("hide-descr");
      allSecDescr[i].classList.toggle("show-descr");

      if (!allSecDescr[i].classList.contains("show-descr")) {
        allBtnDescr[i].innerHTML = "...Read more";
      }
    });
  }
  const allFormFav = Array.from(document.querySelectorAll(".formFav"));
  console.log(allFormFav[0]);

  /*   allFormFav.forEach((fav, index) => {
    fav.id;
  }); */
  /*   const allFavorite = Array.from(document.querySelectorAll(".favorite"));
  console.log(allFavorite[0]);
  let form0 = document.getElementById("form0");
  console.log(form0);
  allFavorite[0].addEventListener("click", (e) => {
    e.preventDefault();
    db.collection("Beers")
      .add({
        title: form0.value,
      })
      .then(() => {
        console.log("ok");
      });
  });

  for (var i = 0; i < allFormFav.length; i++) {
    allFavorite[i].addEventListener("click", (e) => {
      e.preventDefault(); */

  /*     db.collection("Beers")
        .add({
          title: allFormFav[i][value],
        })
        .then(() => {
          console.log("ok");
        }); */
  /*   });
  } */
  /*  allFavorite.forEach((fav) => {
    fav.addEventListener("submit", () => {
      db.collection("Beers").add({
        title: d.name,
      });
    });
  });
  console.log(db.collection("Beers")); */
  //
};

/* db.collection("Beers")
  .add({
    title: "test",
  })
  .then(() => {
    console.log("ok");
  }); */

// Select Dropdown Button
let dropdownSelectorCreator = (data) => {
  let dropdownGroup = document.getElementById("alcohol");
  let filterAlcohol = [];
  //create an array based on Alcohol value;
  data.forEach((d) => {
    if (d.abv < 11) {
      filterAlcohol.push(d.abv);
    }
  });
  //remove duplicates
  let uniqueArray = filterAlcohol.filter((item, pos) => {
    return filterAlcohol.indexOf(item) == pos;
  });

  //creating final selection for dropdown button
  uniqueArray.forEach((elem) => {
    let option = document.createElement("option");
    option.setAttribute("value", elem);
    option.innerHTML = elem;
    dropdownGroup.appendChild(option);
  });
};
//Checkbox creator
let checkboxDiv = document.getElementById("checkbox-select");
let datesArray = [];
let filteredByValue = {};
let checkboxDate = [];
let checkboxCreator = (data) => {
  data.forEach((d) => {
    datesArray.push(d.first_brewed);
  });
  //Find out how many times a date is present
  var count = {};
  datesArray.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
  });

  //Filter dates that are more present
  filteredByValue = Object.fromEntries(
    Object.entries(count).filter(([key, value]) => value >= 8)
  );

  checkboxDate = Object.keys(filteredByValue);
  let orderedCheckbox = checkboxDate.sort(function (x, y) {
    var xp = x.substring(x.length - 1, x.length);
    var yp = y.substring(y.length - 1, y.length);
    return xp == yp ? 0 : xp < yp ? -1 : 1;
  });

  orderedCheckbox.map((check) => {
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "checkbox-name");

    input.setAttribute("id", check);
    input.setAttribute("value", check);

    input.classList.add("margin-checkbox");

    checkboxDiv.appendChild(input);
    checkboxDiv.appendChild(label);
    label.appendChild(document.createTextNode(check));
  });
};

const addEvents = (data) => {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );

  checkboxes.forEach((check) => {
    check.addEventListener("change", () => {
      filterData(data);
    });
  });
  document.getElementById("alcohol").addEventListener("change", () => {
    filterData(data);
  });
};
//Filters
let functionFilter = (data, checkboxes, dropdownGroupElem) => {
  filterBoth = [];
  data.forEach((d) => {
    if (checkboxes.includes(d.first_brewed) || dropdownGroupElem == d.abv) {
      filterBoth.push(d);
    }
  });

  displayResults(filterBoth);
};
let filterData = (data) => {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((checkbox) => {
    return checkbox.value;
  });
  let dropdownGroupElem = document.getElementById("alcohol").value;
  let filterFinal = [];
  // Nothing is selected
  if (checkboxes.length == 0 && dropdownGroupElem == "all") {
    displayResults(data);
  } else {
    //only checkbox is selected
    if (checkboxes.length > 0 && dropdownGroupElem == "all") {
      functionFilter(data, checkboxes, dropdownGroupElem);

      //only dropdown is selected
    } else if (checkboxes.length == 0 && dropdownGroupElem != "all") {
      functionFilter(data, checkboxes, dropdownGroupElem);

      //Both are selected
    } else {
      data.forEach((d) => {
        if (checkboxes.includes(d.first_brewed) && dropdownGroupElem == d.abv) {
          filterFinal.push(d);
        }
      });
      console.log("final", filterFinal);
      displayResults(filterFinal);
    }
  }
};

//fetch Api
let method = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
Promise.all([
  fetch("https://api.punkapi.com/v2/beers?page=1&per_page=5", method),
  fetch("https://api.punkapi.com/v2/beers?page=2&per_page=5", method),
  fetch("https://api.punkapi.com/v2/beers?page=3&per_page=5", method),
  fetch("https://api.punkapi.com/v2/beers?page=4&per_page=5", method),
  fetch("https://api.punkapi.com/v2/beers?page=5&per_page=5", method),
])
  .then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(
      responses.map(function (response) {
        return response.json();
      })
    );
  })
  .then((data) => {
    let newData = [].concat.apply([], data); //Concat nested data arrays

    data = newData;
    console.log("Success:", data);
    data.sort(function (a, b) {
      return a.abv - b.abv;
    });
    dropdownSelectorCreator(data);
    checkboxCreator(data);
    addEvents(data);

    displayResults(data);
  });
