import { getUser, updateUser, deleteUser } from "./api.js";

if (localStorage.getItem("id") == null) {
    window.location.href = "/client/index.html";
}

let id = localStorage.getItem("id");
const profile = document.querySelector(".container");
const userNameTitle = document.querySelector(".title span");
const userName = document.querySelector(".data .username input");
const userEmail = document.querySelector(".data .email input");
const userRole = document.querySelector(".data .role input");
const editButton = document.querySelector("#edit");
const logoutButton = document.querySelector(".logout");
const deleteAccountButton = document.querySelector(".delete button");
const userData = await getUser(id);

async function loadUserData() {
    try {
        userNameTitle.innerHTML = userData.username;
        userName.value = userData.username;
        userEmail.value = userData.email;
        userRole.value = userData.role;
    } catch (error) {
        console.error("Failed to load events:", error);
    }
}

function createAdminButton() {
    const adminButton = document.createElement("button");
    adminButton.textContent = "Edit events";
    adminButton.classList.add("admin");
    profile.appendChild(adminButton);
    adminButton.onclick = () => {
        window.location.href = "admin.html";
    };
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

async function userEditPopup() {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Edit profile</span>
        <div class="ok-cancel">
            <button class="ok"><i class="fas fa-check"></i>Ok</button>
            <button class="cancel"><i class="fas fa-xmark"></i>Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);
    const eventOk = popup.querySelector(".ok");
    const eventCancel = popup.querySelector(".cancel");
    eventOk.addEventListener("click", async () => {
        await updateUser(id, { username: userName.value, email: userEmail.value });
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

function userLogoutPopup() {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Logout</span>
        <div class="ok-cancel">
            <button class="ok"><i class="fas fa-check"></i>Ok</button>
            <button class="cancel"><i class="fas fa-xmark"></i>Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);
    const eventOk = popup.querySelector(".ok");
    const eventCancel = popup.querySelector(".cancel");
    eventOk.addEventListener("click", async () => {
        localStorage.removeItem("id");
        window.location.href = "/client/page/login.html";
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

async function userDeletePopup() {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Delete account</span>
        <div class="ok-cancel">
            <button class="ok"><i class="fas fa-check"></i>Ok</button>
            <button class="cancel"><i class="fas fa-xmark"></i>Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);
    const eventOk = popup.querySelector(".ok");
    const eventCancel = popup.querySelector(".cancel");
    eventOk.addEventListener("click", async () => {
        await deleteUser(id);
        localStorage.removeItem("id");
        window.location.href = "/client/page/login.html";
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

async function errorEditPopup() {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Error</span>
        <div>Please enter a valid email address</div>
        <div class="ok-cancel">
            <button class="cancel"><i class="fas fa-xmark"></i>Ok</button>
        </div>
    `;
    document.body.appendChild(popup);
    const eventCancel = popup.querySelector(".cancel");
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

function updateEditButton() {
    if (userName.value !== userData.username || userEmail.value !== userData.email) {
        editButton.classList.remove("edit-disabled");
        editButton.classList.add("edit");
        editButton.disabled = false;
    } else {
        editButton.classList.remove("edit");
        editButton.classList.add("edit-disabled");
        editButton.disabled = true;
    }
}

userName.addEventListener("input", updateEditButton);
userEmail.addEventListener("input", updateEditButton);

editButton.onclick = () => {
    if (!isValidEmail(userEmail.value)) {
        errorEditPopup();
        return;
    }
    userEditPopup();
};

logoutButton.onclick = () => {
    userLogoutPopup();
};

deleteAccountButton.onclick = () => {
    userDeletePopup();
};

loadUserData();

if (userRole.value.toLowerCase() == "admin") {
    createAdminButton();
}
