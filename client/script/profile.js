import { getUser, updateUser, deleteUser } from "./api.js";

const profile = document.querySelector(".container");
const userNameTitle = document.querySelector(".title span");
const userName = document.querySelector(".data .username input");
const userEmail = document.querySelector(".data .email input");
const userRole = document.querySelector(".data .role input");
const editButton = document.querySelector("#edit");
const logoutButton = document.querySelector(".logout");
const deleteAccountButton = document.querySelector(".delete button");
let id = localStorage.getItem("id");
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

async function userEditPopup() {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    popup.classList.add("popup");
    popup.innerHTML = /*html*/ `
        <span class="event-title">Edit profile</span>
        <div class="ok-cancel">
            <button class="ok"><i class="fas fa-check"></i>Edit</button>
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
            <button class="ok"><i class="fas fa-check"></i>Logout</button>
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
            <button class="ok"><i class="fas fa-check"></i>Delete</button>
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

userName.addEventListener("input", (e) => {
    if (e.target.value != userData.username) {
        editButton.classList.remove("edit-disabled");
        editButton.classList.add("edit");
        editButton.disabled = false;
    } else {
        editButton.classList.remove("edit");
        editButton.classList.add("edit-disabled");
        editButton.disabled = true;
    }
});

userEmail.addEventListener("input", (e) => {
    if (e.target.value != userData.email) {
        editButton.classList.remove("edit-disabled");
        editButton.classList.add("edit");
        editButton.disabled = false;
    } else {
        editButton.classList.remove("edit");
        editButton.classList.add("edit-disabled");
        editButton.disabled = true;
    }
});

editButton.onclick = () => {
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
