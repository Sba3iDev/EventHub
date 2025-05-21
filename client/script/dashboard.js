import { fetchEvents, getUser, getEventByEventId } from "./api.js";

if (localStorage.getItem("id") == null) {
    window.location.href = "/client/index.html";
}

let id = localStorage.getItem("id");
const eventTable = document.querySelector(".events-container table tbody");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector(".filter select");
const userName = document.querySelector(".account span");
const userData = await getUser(id);
const events = await fetchEvents();

function renderEvents(events) {
    eventTable.innerHTML = events
        .sort((a, b) => {
            let dateCompare = new Date(a.date) - new Date(b.date);
            if (dateCompare === 0) {
                return a.time.localeCompare(b.time);
            }
            return dateCompare;
        })
        .map(
            (event) => /*html*/ `
        <tr id="${event.id}">
            <td>${event.title}</td>
            <td>${event.category}</td>
            <td>${event.date}</td>
            <td>${event.time}</td>
            <td>${event.location}</td>
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

async function eventShowPopup(eventId) {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    const event = await getEventByEventId(eventId);
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Event details</span>
        <div class="data-inputs">
            <span>Title</span>
            <input type="text" name="title" id="title" value="${event.title}" readonly />
            <span>Description</span>
            <textarea name="description" id="description" readonly>${event.description}</textarea>
            <span>Category</span>
            <input type="text" name="category" id="category" value="${event.category}" disabled>
            <span>Date</span>
            <input type="date" name="date" id="date" value="${event.date}" readonly>
            <span>Time</span>
            <input type="time" name="time" id="time" value="${event.time}" readonly>
            <span>Location</span>
            <input type="text" name="location" id="location" value="${event.location}" readonly>
        </div>
    `;
    document.body.appendChild(popup);
    overlay.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
    });
    return popup;
}

let currentSearch = "";
searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    const filtered = filterEvents(events, currentSearch, filterSelect.value);
    renderEvents(filtered);
    const eventRows = document.querySelectorAll(".events-container table tbody tr");
    eventRows.forEach((event) => {
        event.addEventListener("click", (e) => {
            eventShowPopup(e.target.closest("tr").id);
        });
    });
});

filterSelect.addEventListener("change", (e) => {
    const filtered = filterEvents(events, currentSearch, e.target.value);
    renderEvents(filtered);
    const eventRows = document.querySelectorAll(".events-container table tbody tr");
    eventRows.forEach((event) => {
        event.addEventListener("click", (e) => {
            eventShowPopup(e.target.closest("tr").id);
        });
    });
});

loadData();

const eventRows = document.querySelectorAll(".events-container table tbody tr");
eventRows.forEach((event) => {
    event.addEventListener("click", (e) => {
        eventShowPopup(e.target.closest("tr").id);
    });
});
