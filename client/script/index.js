if (localStorage.getItem("id") == null) {
    window.location.href = "/client/page/login.html";
} else {
    window.location.href = "/client/page/dashboard.html";
}
