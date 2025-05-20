import { loginUser } from "./api.js";

const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector(".error-message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await loginUser({
            email: emailInput.value,
            password: passwordInput.value,
        });
        if (response.message === "Login successful") {
            window.location.href = "../index.html";
        }
    } catch (error) {
        errorMessage.classList.remove("hide");
        passwordInput.value = "";
    }
});

[emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
        errorMessage.classList.add("hide");
    });
});
