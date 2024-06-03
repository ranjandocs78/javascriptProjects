// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch("https://api.restful-api.dev/objects");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//Function to Create new data from the api
async function addItem() {
  try {
    payLoad = {};
    payLoad.name = "POCO M2";
    //payLoad.data.price = '10000';
    //payLoad.data.year = 2024;
    payLoad.data = {
      price: "10000",
      year: "2024",
    };
    const response = await fetch("https://api.restful-api.dev/objects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad), // convert javascript  object payLoad to String
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getItemInfo(item) {
  let data = item.data;
  let info = "";
  for (let x in data) {
    info += data[x];
    info += "|";
  }
  return info;
}
// Call the renderData function to display data

//let itemadded = addItem();
//only render data is invoked and render has to wait for addItem() and fetchdata()   using await until fetch returns data
renderData();

//

// Function to render data in cards
async function renderData() {
  const container = document.querySelector(".container");
  const check = await addItem();
  const data = await fetchData();

  if (!data) {
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("cards");

    const title = document.createElement("h2");
    title.textContent = item.id;

    const body = document.createElement("p");
    body.textContent = item.name + getItemInfo(item);

    card.appendChild(title);
    card.appendChild(body);
    container.appendChild(card);
  });
}
