const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillinairesBtn = document.getElementById("show-millionaires");
const show100kBtn = document.getElementById("show-100k");
const sortBtn = document.getElementById("sort");
const sortPoorBtn = document.getElementById("sort-poor");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  // Add a new user as part of getRandomUser
  addData(newUser);
}

// Double the Wealth field
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort the users by wealth
// Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}
// Sort the users by wealth
// Poorest
function sortByPoorest() {
  data.sort((a, b) => a.money - b.money);

  updateDOM();
}

// Filter by Millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    console.log(wealth);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

  main.appendChild(wealthEl);
}

// Only show those at 100k and more with
function showHundredThou() {
  data = data.filter((user) => user.money > 100000);

  updateDOM();
}

// Add new obj to data
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person </strong> Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name} </strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
//
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
sortPoorBtn.addEventListener("click", sortByPoorest);
showMillinairesBtn.addEventListener("click", showMillionaires);
show100kBtn.addEventListener("click", showHundredThou);
calculateWealthBtn.addEventListener("click", calculateWealth);
