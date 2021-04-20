//Table Variables
let tableResult = document.getElementById("tableResult");
let bodyTable = document.getElementById("bodyTable");
let tot = document.getElementById("tot");

//Table
let displayResults = (data) => {
  bodyTable.innerHTML = "";
  tableResult.classList.toggle("showTable");
  let numData = "";
  tot.innerHTML = data.length;
  data.forEach((d) => {
    let tr = document.createElement("tr");
    let td0 = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    numData++;
    td0.innerHTML = numData;
    td1.innerHTML = d.id;
    td2.innerHTML = d.name;
    td3.innerHTML = d.abv;
    td4.innerHTML = d.description;
    td5.innerHTML = d.first_brewed;
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    bodyTable.appendChild(tr);
  });
};
// Select Dropdown Button
let dropdownSelectorCreator = (data) => {
  let dropdownGroup = document.getElementById("alcohol");
  let filterAlcohol = [];
  data.forEach((d) => {
    filterAlcohol.push(d.abv); //create an array based on Alcohol value;
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
  console.log(dropdownGroup);
};
//Checkbox selector
let checkboxDiv = document.getElementById("checkbox-select");

let checkboxArray = ["2016", "2017", "2018"];
let checkboxSelector = () => {
  checkboxArray.map((check) => {
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "checkbox-name");
    input.setAttribute("id", check);
    input.setAttribute("value", check);

    checkboxDiv.appendChild(input);
    checkboxDiv.appendChild(label);
    label.appendChild(document.createTextNode(check));
  });
};

checkboxSelector();
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
let filterData = (data) => {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((checkbox) => {
    return checkbox.value;
  });
  let dropdownGroupElem = document.getElementById("alcohol").value;
  console.log("drop", dropdownGroupElem);
  console.log(checkboxes);
  let filteredArray = [];
  if (checkboxes.length === 0) {
    displayResults(data);
  } else {
    data.forEach((d) => {
      if (checkboxes.includes(d.first_brewed)) {
        filteredArray.push(d);
      }
    });
    displayResults(filteredArray);
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
    addEvents(data);

    displayResults(data);
  });
