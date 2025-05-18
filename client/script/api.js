const apiBase = "http://localhost:3000/";

async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "API request failed");
    }
    return response.json();
}

export async function fetchEvents() {
    return fetch(`${apiBase}events`).then(handleResponse);
}

export async function getEvent(id) {
    return fetch(`${apiBase}events/${id}`).then(handleResponse);
}

export async function createEvent(eventData) {
    return fetch(`${apiBase}events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
    }).then(handleResponse);
}

export async function updateEvent(id, eventData) {
    return fetch(`${apiBase}events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
    }).then(handleResponse);
}

export async function deleteEvent(id) {
    return fetch(`${apiBase}events/${id}`, {
        method: "DELETE",
    }).then(handleResponse);
}
