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

export async function fetchUsers() {
    return fetch(`${apiBase}users`).then(handleResponse);
}

export async function getUser(id) {
    return fetch(`${apiBase}users/${id}`).then(handleResponse);
}

export async function registerUser(userData) {
    return fetch(`${apiBase}users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    }).then(handleResponse);
}

export async function loginUser(Userdata) {
    return fetch(`${apiBase}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Userdata),
    }).then(handleResponse);
}

export async function updateUser(id, userData) {
    return fetch(`${apiBase}users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    }).then(handleResponse);
}

export async function deleteUser(id) {
    return fetch(`${apiBase}users/${id}`, {
        method: "DELETE",
    }).then(handleResponse);
}
