import { getEvent, getUser, createEvent } from "./api.js";

const eventTable = document.querySelector(".events-container table tbody");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector(".filter select");
const userName = document.querySelector(".account span");
const createEventButton = document.querySelector(".create");
const editEvent = document.querySelector(".edit");
const deleteEvent = document.querySelector(".delete");
let id = 1;
const userData = await getUser(id);
const events = await getEvent(id);

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

function eventCreatePopup() {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Create event</span>
        <div class="data-inputs">
            <span>Title *</span>
            <input type="text" name="title" id="title" />
            <span>Description</span>
            <textarea name="description" id="description"></textarea>
            <span>Category *</span>
            <select name="category" id="category">
                <option value="All categories" selected>All categories</option>
                <option value="Club meetings">Club meetings</option>
                <option value="Workshops">Workshops</option>
                <option value="Sport matches">Sport matches</option>
                <option value="Study groups">Study groups</option>
            </select>
            <span>Date *</span>
            <input type="date" name="date" id="date">
            <span>Time *</span>
            <input type="time" name="time" id="time">
            <span>Location *</span>
            <input type="text" name="location" id="location">
        </div>
        <div class="hide-error">Fill all the inputs feilds</div>
        <div class="ok-cancel">
            <button class="ok"><i class="fas fa-check"></i>Ok</button>
            <button class="cancel"><i class="fas fa-xmark"></i>Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);
    const eventTitle = popup.querySelector("#title");
    const eventDescription = popup.querySelector("#description");
    const eventCategory = popup.querySelector("#category");
    const eventDate = popup.querySelector("#date");
    const eventTime = popup.querySelector("#time");
    const eventLocation = popup.querySelector("#location");
    const eventOk = popup.querySelector(".ok");
    const eventCancel = popup.querySelector(".cancel");
    eventOk.addEventListener("click", async () => {
        const errorDiv = popup.querySelector(".hide-error");
        if (
            eventTitle.value.trim() === "" ||
            eventCategory.value === "All categories" ||
            eventDate.value.trim() === "" ||
            eventTime.value.trim() === "" ||
            eventLocation.value.trim() === ""
        ) {
            if (errorDiv) {
                errorDiv.classList.remove("hide-error");
                errorDiv.classList.add("show-error");
            }
            return;
        } else {
            if (errorDiv) {
                errorDiv.classList.add("hide-error");
                errorDiv.classList.remove("show-error");
            }
            await createEvent({
                title: eventTitle.value,
                description: eventDescription.value,
                category: eventCategory.value,
                date: eventDate.value,
                time: eventTime.value,
                location: eventLocation.value,
                user_id: id,
            });
            popup.remove();
        }
    });
    [eventTitle, eventDescription, eventCategory, eventDate, eventTime, eventLocation].forEach((input) => {
        input.addEventListener("input", () => {
            const errorDiv = popup.querySelector(".show-error");
            if (errorDiv) {
                errorDiv.classList.remove("show-error");
                errorDiv.classList.add("hide-error");
            }
        });
        if (input.tagName === "SELECT") {
            input.addEventListener("change", () => {
                const errorDiv = popup.querySelector(".show-error");
                if (errorDiv) {
                    errorDiv.classList.remove("show-error");
                    errorDiv.classList.add("hide-error");
                }
            });
        }
    });
    eventCancel.addEventListener("click", () => {
        popup.remove();
    });
    return popup;
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

createEventButton.addEventListener("click", () => {
    const popup = eventCreatePopup("Create");
});

loadData();
