import { getEvent, getUser } from "./api.js";

const eventTable = document.querySelector(".events-container table tbody");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector(".filter select");
const userName = document.querySelector(".account span");
let id = 1;
const userData = await getUser(id);
const events = await getEvent(id);

function renderEvents(events) {
    eventTable.innerHTML = events
        .map(
            (event) => /*html*/ `
        <tr>
            <td>${event.title}</td>
            <td>${event.category}</td>
            <td>${event.date}</td>
            <td>${event.time}</td>
            <td>${event.location}</td>
            <td>
                <button class="edit"><i class="fas fa-edit"></i>Edit</button>
                <button class="delete"><i class="fas fa-trash"></i>Delete</button>
            </td>
        </tr>`
        )
        .join("");
}

async function loadData() {
    try {
        userName.innerHTML = userData.username;
        renderEvents(events);
    } catch (error) {
        console.error("Failed to load events:", error);
    }
}

function filterEvents(events, searchTerm, category) {
    return events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === "All categories" ? true : false || event.category === category;
        return matchesSearch && matchesCategory;
    });
}

let currentSearch = "";
searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    const filtered = filterEvents(events, currentSearch, filterSelect.value);
    renderEvents(filtered);
});

filterSelect.addEventListener("change", (e) => {
    const filtered = filterEvents(events, currentSearch, e.target.value);
    renderEvents(filtered);
});

loadData();
