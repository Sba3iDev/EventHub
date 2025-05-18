import { fetchEvents } from "./api.js";

const eventTable = document.querySelector(".events-container table tbody");
const searchInput = document.querySelector("#search");
const filter = document.querySelector(".filter");
const filterInput = document.querySelector(".filter input");
const categories = ["Club meetings", "Workshops", "Sport matches", "Study groups"];
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

function filterEvents(events, searchTerm) {
    return events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

searchInput.addEventListener("input", async (e) => {
    const filtered = filterEvents(events, e.target.value);
    renderEvents(filtered);
});

filterInput.onfocus = () => {
    const categoryFilter = document.createElement("div");
    categoryFilter.innerHTML = categories.map((ctg) => /*html*/ `<span>${ctg}</span>`).join("");
    filterInput.addEventListener("input", () => {
        categoryFilter.innerHTML = categories
            .map((ctg) => /*html*/ `<span>${ctg}</span>`)
            .filter((ctg) => ctg.toLowerCase().includes(filterInput.value.toLowerCase()))
            .join("");
    });
    categoryFilter.classList.add("category-filter");
    filter.appendChild(categoryFilter);
};

filterInput.onblur = () => {
    const categoryFilter = filter.querySelector(".category-filter");
    if (categoryFilter) categoryFilter.remove();
};

loadEvents();
