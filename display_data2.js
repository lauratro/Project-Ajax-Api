let dataResult = document.getElementById("dataResult");
//table
let tableResult = document.getElementById("tableResult");
let prevBtn = document.getElementById("prev");
let succBtn = document.getElementById("succ");
let pageNumber = 1;
let currentPage = document.getElementById("page");

var i = 2;
let y = 1;
let f;
let url1 = ``;
function pageChanger() {
  succBtn.addEventListener("click", function increment() {
    y = i++;
    currentPage.innerHTML = y;
    console.log(y);
    url1 = `https://api.punkapi.com/v2/beers?page=${y}`;

    console.log(url1);
  });
  prevBtn.addEventListener("click", function increment() {
    y = i--;
    currentPage.innerHTML = y;
    console.log(y);
    url1 = `https://api.punkapi.com/v2/beers?page=${y}`;

    console.log(url1);
  });

  fetch(
    url1,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      data.sort(function (a, b) {
        return a.id - b.id;
      });

      if (data.length > 0) {
        tableResult.classList.toggle("showTable");
        var tab = "";
        var num = 0;
        data.forEach((d) => {
          num++;
          tab += "<tr>";
          tab += "<td>" + d.id + "</td>";
          tab += "<td>" + d.name + "</td>";
          tab += "<td>" + d.abv + "</td>";
          tab += "</tr>";
        });
        dataResult.innerHTML = tab;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
