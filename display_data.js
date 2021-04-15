let dataResult = document.getElementById("dataResult");
//table
let tableResult = document.getElementById("tableResult");
let tot = document.getElementById("tot");

let alc;
let alcbg;
let url = new URL(window.location.href);

if (url.searchParams.get("alcohol") == 1) {
  alc = 1;
  alcbg = 0;
} else if (url.searchParams.get("alcohol") == 4) {
  alc = 4;
  alcbg = 0.9;
} else if (url.searchParams.get("alcohol") == 6) {
  alc = 6;
  alcbg = 3.9;
} else {
  alc = 0;
  alcbg = 50;
}
//Table
let tableRes = (data) => {
  tableResult.classList.toggle("showTable");
  var tab = "";
  var num = "";
  data.forEach((d) => {
    num++;
    tab += "<tr>";
    tab += "<td>" + num + "</td>";
    tab += "<td>" + d.name + "</td>";
    tab += "<td>" + d.abv + "</td>";
    tab += "</tr>";
  });
  dataResult.innerHTML = tab;
};
fetch(
  `https://api.punkapi.com/v2/beers?page=1&abv_lt=${alc}&abv_gt=${alcbg}`,

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
      return a.abv - b.abv;
    });
    if (data.length > 0) {
      return tableRes(data);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
