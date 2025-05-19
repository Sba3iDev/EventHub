import { fetchEvents } from "./api.js";

const eventTable = document.querySelector(".events-container table tbody");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector(".filter select");
const events = await fetchEvents();

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
        </tr>`
        )
        .join("");
}

async function loadEvents() {
    try {
        renderEvents(events);
    } catch (error) {
        console.error("Failed to load events:", error);
    }
}

function filterEvents(events, searchTerm, category) {
    return events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        // const matchesSearch = event.title.toLowerCase().slice(0, searchTerm.length) === searchTerm.toLowerCase();
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

loadEvents();
