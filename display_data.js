let dataResult = document.getElementById("dataResult");

let data;

let url = new URL(window.location.href);

if (url.searchParams.get("alcohol") == 1) {
  data = 1;
} else if (url.searchParams.get("alcohol") == 4) {
  data = 4;
} else if (url.searchParams.get("alcohol") == 6) {
  data = 6;
}
fetch(
  `https://api.punkapi.com/v2/beers?abv_lt=${data}`,

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

    for (var i = 0; i < data.length; i++) {
      let div = document.createElement("div");
      div.innerHTML = data[i].name;
      dataResult.appendChild(div);
      console.log(url);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
