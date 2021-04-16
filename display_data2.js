let dataResult = document.getElementById("dataResult");
//table
let tableResult = document.getElementById("tableResult");
let tot = document.getElementById("tot");
let succBtn = document.getElementById("succ");
let prevBtn = document.getElementById("prev");
let currentPage = document.getElementById("page");
let pageNumber = 1;
let y = 1;
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
var btns = document.querySelectorAll("button");
btns.forEach(function (btn) {
  btn.addEventListener("click", updateAmount);
});
var num;

function updateAmount() {
  num = parseInt(document.getElementById("number").textContent.trim(), 10);
  this.value === "minus" ? num-- : num++;
  document.getElementById("number").textContent = num;

  return num;
}

let pageChanger = (num) => {
  var url = new URL("https://api.punkapi.com/v2/beers?");
  var b = num;

  url.searchParams.set("page", b);

  console.log(url);
  return url;
};

fetch(pageChanger(updateAmount()), {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    //  console.log("Success:", data);
    data.sort(function (a, b) {
      return a.id - b.id;
    });
    displayResults(data);
    if (data) {
      updateAmount();
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
