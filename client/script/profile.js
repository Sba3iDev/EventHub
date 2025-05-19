import { getUser, updateUser, deleteUser } from "./api.js";

const userNameTitle = document.querySelector(".title span");
const userName = document.querySelector(".data .username input");
const userEmail = document.querySelector(".data .email input");
const userRole = document.querySelector(".data .role input");
const editButton = document.querySelector("#edit");
const deleteAccountButton = document.querySelector(".delete button");
let id = 1;
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

editButton.onclick = async () => {
    await updateUser(id, { username: userName.value, email: userEmail.value });
};

deleteAccountButton.onclick = async () => {
    await deleteUser(id);
};

loadUserData();
