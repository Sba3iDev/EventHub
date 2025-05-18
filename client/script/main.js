import { fetchEvents } from "./api.js";

const eventTable = document.querySelector(".events-container table tbody");
const searchInput = document.querySelector("#search");

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
        const events = await fetchEvents();
        renderEvents(events);
    } catch (error) {
        console.error("Failed to load events:", error);
    }
}

function filterEvents(events, searchTerm) {
    return events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

searchInput.addEventListener("input", async (e) => {
    const events = await fetchEvents();
    const filtered = filterEvents(events, e.target.value);
    renderEvents(filtered);
});

loadEvents();
