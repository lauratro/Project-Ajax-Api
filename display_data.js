//Table Variables
let tableResult = document.getElementById("tableResult");
let bodyTable = document.getElementById("bodyTable");
let tot = document.getElementById("tot");

//Table
let displayResults = (data) => {
  tableResult.classList.toggle("showTable");
  let numData = "";
  tot.innerHTML = data.length;
  data.forEach((d) => {
    let tr = document.createElement("tr");
    let td0 = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    numData++;
    td0.innerHTML = numData;
    td1.innerHTML = d.id;
    td2.innerHTML = d.name;
    td3.innerHTML = d.abv;
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    bodyTable.appendChild(tr);
  });
};
// Select Dropdown Button
let dropdownSelector = (data) => {
  let dropdownGroup = document.getElementById("alcohol");
  let filterAlcohol = [];
  data.forEach((d) => {
    filterAlcohol.push(d.abv); //create an array based on Alcohol value;
  });
  let uniqueArray = filterAlcohol.filter((item, pos) => {
    //remove duplicates
    return filterAlcohol.indexOf(item) == pos;
  });
  let integerValue = uniqueArray.filter((elem) => {
    // select only integer numbers
    if (Number.isInteger(elem)) {
      return elem;
    }
  });
  console.log("integerValue", integerValue);
  integerValue.forEach((elem) => {
    let option = document.createElement("option");
    option.value = elem;
    option.innerHTML = elem;
    dropdownGroup.appendChild(option);
  });
};

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
    dropdownSelector(data);

    displayResults(data);
  });
