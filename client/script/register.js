import { registerUser } from "./api.js";

const registerForm = document.querySelector(".register-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const roleInput = document.querySelector("#role");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector(".error-message");

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!isValidEmail(emailInput.value)) {
        errorMessage.textContent = "Please enter a valid email address";
        errorMessage.classList.remove("hide");
        return;
    }
    try {
        const response = await registerUser({
            username: usernameInput.value,
            email: emailInput.value,
            role: roleInput.value,
            password: passwordInput.value,
        });
        if (response.message === "User created successfully") {
            localStorage.setItem("id", response.id);
            window.location.href = "../page/dashboard.html";
        }
    } catch (error) {
        errorMessage.textContent = "Email is already in use. Please use a different email.";
        errorMessage.classList.remove("hide");
        passwordInput.value = "";
    }
});

[usernameInput, emailInput, roleInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
        errorMessage.classList.add("hide");
    });
});
