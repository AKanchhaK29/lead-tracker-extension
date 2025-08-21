let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Load saved leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// Render function
function render(leads) {
  ulEl.innerHTML = leads
    .map(
      (lead) => `
        <li>
          <a target="_blank" href="${lead}">
            ${lead}
          </a>
        </li>`
    )
    .join("");
}

// Save input lead
inputBtn.addEventListener("click", function () {
  const lead = inputEl.value.trim();
  if (lead && !myLeads.includes(lead)) {   // prevent empty & duplicate
    myLeads.push(lead);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
  inputEl.value = "";
});

// Save current tab lead
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabUrl = tabs[0].url;
    if (!myLeads.includes(tabUrl)) {   // prevent duplicates
      myLeads.push(tabUrl);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    }
  });
});

// Delete all leads (double-click for safety)
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});