import { getEventByUserId, getEventByEventId, getUser, createEvent, updateEvent, deleteEvent } from "./api.js";

const eventTable = document.querySelector(".events-container table tbody");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector(".filter select");
const userName = document.querySelector(".account span");
const createEventButton = document.querySelector(".create");
let id = localStorage.getItem("id");
const userData = await getUser(id);
const events = await getEventByUserId(id);

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
                <button class="edit" id="${event.id}"><i class="fas fa-edit"></i>Edit</button>
                <button class="delete" id="${event.id}"><i class="fas fa-trash"></i>Delete</button>
            </td>
        </tr>`
        )
        .join("");
}

async function eventCreatePopup() {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
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
                <option value="Categories" selected disabled>Categories</option>
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
            eventCategory.value === "Categories" ||
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
            overlay.remove();
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
        overlay.remove();
    });
    overlay.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
    });
    return popup;
}

async function eventEditPopup(eventId) {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    const event = await getEventByEventId(eventId);
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Edit event</span>
        <div class="data-inputs">
            <span>Title *</span>
            <input type="text" name="title" id="title" value="${event.title}" />
            <span>Description</span>
            <textarea name="description" id="description">${event.description}</textarea>
            <span>Category *</span>
            <select name="category" id="category">
                <option value="Categories" disabled>Categories</option>
                <option value="Club meetings" ${event.category === "Club meetings" ? "selected" : ""}>Club meetings</option>
                <option value="Workshops" ${event.category === "Workshops" ? "selected" : ""}>Workshops</option>
                <option value="Sport matches" ${event.category === "Sport matches" ? "selected" : ""}>Sport matches</option>
                <option value="Study groups" ${event.category === "Study groups" ? "selected" : ""}>Study groups</option>
            </select>
            <span>Date *</span>
            <input type="date" name="date" id="date" value="${event.date}">
            <span>Time *</span>
            <input type="time" name="time" id="time" value="${event.time}">
            <span>Location *</span>
            <input type="text" name="location" id="location" value="${event.location}">
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
            await updateEvent(eventId, {
                title: eventTitle.value,
                description: eventDescription.value,
                category: eventCategory.value,
                date: eventDate.value,
                time: eventTime.value,
                location: eventLocation.value,
                user_id: id,
            });
            popup.remove();
            overlay.remove();
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
        overlay.remove();
    });
    overlay.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
    });
    return popup;
}

async function eventDeletePopup(eventId) {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    const event = await getEventByEventId(eventId);
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Delete Event</span>
        <div class="delete-message">
            Are you sure you want to delete the event <strong>"${event.title}"</strong> scheduled on <strong>${event.date}</strong> at <strong>${event.time}</strong>?
            <br>This action cannot be undone.
        </div>
        <div class="ok-cancel">
            <button class="ok"><i class="fas fa-check"></i>Delete</button>
            <button class="cancel"><i class="fas fa-xmark"></i>Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);
    const eventOk = popup.querySelector(".ok");
    const eventCancel = popup.querySelector(".cancel");
    eventOk.addEventListener("click", async () => {
        await deleteEvent(eventId);
        popup.remove();
        overlay.remove();
    });
    eventCancel.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
    });
    overlay.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
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
    const editEventButtons = document.querySelectorAll(".edit");
    editEventButtons.forEach((editButton) => {
        editButton.addEventListener("click", (e) => {
            eventEditPopup(e.target.closest("button").id);
        });
    });
    const deleteEventButton = document.querySelectorAll(".delete");
    deleteEventButton.forEach((deleteButton) => {
        deleteButton.addEventListener("click", (e) => {
            eventDeletePopup(e.target.closest("button").id);
        });
    });
});

filterSelect.addEventListener("change", (e) => {
    const filtered = filterEvents(events, currentSearch, e.target.value);
    renderEvents(filtered);
    const editEventButtons = document.querySelectorAll(".edit");
    editEventButtons.forEach((editButton) => {
        editButton.addEventListener("click", (e) => {
            eventEditPopup(e.target.closest("button").id);
        });
    });
    const deleteEventButton = document.querySelectorAll(".delete");
    deleteEventButton.forEach((deleteButton) => {
        deleteButton.addEventListener("click", (e) => {
            eventDeletePopup(e.target.closest("button").id);
        });
    });
});

createEventButton.addEventListener("click", () => {
    eventCreatePopup();
});

loadData();

const editEventButtons = document.querySelectorAll(".edit");
editEventButtons.forEach((editButton) => {
    editButton.addEventListener("click", (e) => {
        eventEditPopup(e.target.closest("button").id);
    });
});

const deleteEventButton = document.querySelectorAll(".delete");
deleteEventButton.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
        eventDeletePopup(e.target.closest("button").id);
    });
});
