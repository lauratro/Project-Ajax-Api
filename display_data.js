//Table Variables
let tableResult = document.getElementById("tableResult");
let bodyTable = document.getElementById("bodyTable");
let tot = document.getElementById("tot");
let filterBoth = [];
//Table
let displayResults = (data) => {
  bodyTable.innerHTML = "";
  tableResult.classList.toggle("showTable");
  let numData = "";
  tot.innerHTML = data.length;
  let modalContainer = document.getElementById("modal-container");
  let modal = "";
  data.forEach((d, index) => {
    let tr = document.createElement("tr");
    let td0 = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let btnTable = document.createElement("button");
    //Description
    let btnDescr = document.createElement("button");
    btnDescr.classList.add("descrBtn");
    btnDescr.innerHTML = "Show More";
    let td4due = document.createElement("p");
    td4due.innerHTML = d.description.substring(70);
    td4due.classList.add("hide-descr");
    td4due.classList.add("sec-descr");

    //Button Modal
    let btnModal = document.createElement("button");
    btnModal.innerHTML = "Show More";

    // btnModal.setAttribute("id", "modalBtn" + d.name);
    btnModal.setAttribute("data-toggle", "modal");
    btnModal.setAttribute("data-target", `#modal${index}`);
    // btnModal.classList.add("button-food");

    modal += `<div class="modal fade" id="modal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <p>${d.name}</p>
      <p>${d.food_pairing}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;

    numData++;
    td0.innerHTML = numData;
    td1.innerHTML = d.id;
    td2.innerHTML = d.name;
    td3.innerHTML = d.abv;
    td4.innerHTML = d.description.substring(0, 70);
    td5.innerHTML = d.first_brewed;
    btnTable.innerHTML = "Show More";
    btnTable.classList.add("button-food");
    btnTable.classList.add("click-btn");

    td6.innerHTML = d.food_pairing;
    td6.classList.add("hide-food");
    td6.classList.add("food-td");
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    td4.appendChild(td4due);
    td4.appendChild(btnDescr);
    tr.appendChild(td6);
    tr.appendChild(btnModal);

    bodyTable.appendChild(tr);
  });
  modalContainer.innerHTML = modal;
  //Show food column
  /*  let foodTd = Array.from(document.querySelectorAll(".food-td"));

  let allBtn = Array.from(document.querySelectorAll(".button-food"));

  for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].addEventListener("click", () => {
      allBtn[i].innerHTML = "Show Less";

      foodTd[i].classList.toggle("show-food");
      if (!foodTd[i].classList.contains("show-food")) {
        allBtn[i].innerHTML = "Show more";
      }
    });
  } */
  //Description show more and Less
  let allSecDescr = Array.from(document.querySelectorAll(".sec-descr"));

  let allBtnDescr = Array.from(document.querySelectorAll(".descrBtn"));
  for (let i = 0; i < allBtnDescr.length; i++) {
    allBtnDescr[i].addEventListener("click", () => {
      allBtnDescr[i].innerHTML = "Show Less";

      allSecDescr[i].classList.toggle("show-descr");

      if (!allSecDescr[i].classList.contains("show-descr")) {
        allBtnDescr[i].innerHTML = "Show more";
      }
    });
  }
};

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
  /* console.log("orderedCheckbox", orderedCheckbox);*/

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
  console.log("singleFilter", filterBoth);
  displayResults(filterBoth);
};
let filterData = (data) => {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((checkbox) => {
    return checkbox.value;
  });

  console.log(checkboxes);

  let dropdownGroupElem = document.getElementById("alcohol").value;
  console.log("drop", dropdownGroupElem);

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
  fetch("https://api.punkapi.com/v2/beers?page=1&per_page=80", method),
  fetch("https://api.punkapi.com/v2/beers?page=2&per_page=80", method),
  fetch("https://api.punkapi.com/v2/beers?page=3&per_page=80", method),
  fetch("https://api.punkapi.com/v2/beers?page=4&per_page=80", method),
  fetch("https://api.punkapi.com/v2/beers?page=5&per_page=80", method),
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
