import { registerUser } from "./api.js";

const registerForm = document.querySelector(".register-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const roleInput = document.querySelector("#role");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector(".error-message");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await registerUser({
            username: usernameInput.value,
            email: emailInput.value,
            role: roleInput.value,
            password: passwordInput.value,
        });
        if (response.message === "User created successfully") {
            window.location.href = "../index.html";
        }
    } catch (error) {
        errorMessage.classList.remove("hide");
        passwordInput.value = "";
    }
});

[usernameInput, emailInput, roleInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
        errorMessage.classList.add("hide");
    });
});
