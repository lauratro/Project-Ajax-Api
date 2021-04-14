const data = "Punk";
let dataResult = document.getElementById("dataResult");
//url Api
let params = new URL(document.location).searchParams;
let name = params.get("name");
let url = document.location;
let divUrl = document.getElementById("url");
divUrl.innerHTML = url;
if (url == "http://127.0.0.1:5500/display_data.html?select=name") {
  fetch(
    `https://api.punkapi.com/v2/beers?beer_name=${data}`,

    {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      //  body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      for (var i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = data[i].name;
        dataResult.appendChild(div);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
} else {
  divUrl.innerHTML = altro;
}
