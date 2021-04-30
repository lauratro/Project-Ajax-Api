let dataResult = document.getElementById("dataResult");
//table
let tableResult = document.getElementById("tableResult");
let tot = document.getElementById("tot");

//radio
/* let form2 = document.getElementById("form2");
console.log("form2", form2);
let trueBtn = document.getElementById("true");
let falseBtn = document.getElementById("false");
let submitRadio = document.getElementById("submit");
let ciao = document.getElementById("ciao"); */

//Table
let displayResults = (data) => {
  tableResult.classList.toggle("showTable");
  var tab = "";
  var num = "";
  data.forEach((d) => {
    num++;
    tab += "<tr>";
    tab += "<td>" + d.id + "</td>";
    tab += "<td>" + d.name + "</td>";
    tab += "<td>" + d.abv + "</td>";
    tab += "</tr>";
  });

  dataResult.innerHTML = tab;
};
/* var btns = document.querySelectorAll("button");
btns.forEach(function (btn) {
  btn.addEventListener("click", updateAmount);
});
var num;

function updateAmount() {
  num = parseInt(document.getElementById("number").textContent.trim(), 10);
  this.value === "minus" ? num-- : num++;
  document.getElementById("number").textContent = num;

  return num;
} */
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
    function changeRadio() {
      if (document.querySelector('input[name="alcohol"]')) {
        document.querySelectorAll('input[name="alcohol"]').forEach((elem) => {
          elem.addEventListener("change", function (event) {
            var item = event.target.value;
            console.log(item);
            if (item == "one") {
              let filtrato = data.filter((x, i) => {
                return x.abv < 4.1 && x.abv > 0;
              });

              console.log(filtrato);
              displayResults(filtrato);
            } else if (item == "four") {
              let filtrato = data.filter((x) => {
                return x.abv < 6.1 && x.abv > 4;
              });

              console.log(filtrato);
              displayResults(filtrato);
            } else if (item == "six") {
              let filtrato = data.filter((x) => {
                return x.abv > 6;
              });

              console.log(filtrato);
              displayResults(filtrato);
            }
          });
        });
      }
    }
    changeRadio();

    console.log(data);
    displayResults(data);
  });
