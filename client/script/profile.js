import { getUser } from "./api.js";

const userNameTitle = document.querySelector(".title span");
const userName = document.querySelector(".data .username input");
const userEmail = document.querySelector(".data .email input");
const userRole = document.querySelector(".data .role input");
const userData = await getUser(1);

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

loadUserData();
