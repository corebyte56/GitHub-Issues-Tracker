const userName = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const usernameValue = userName.value.trim();
    const passwordValue = password.value;

    if (usernameValue === "admin" && passwordValue === "admin123") {
        // Redirect to home page
        alert("Login successful! Redirecting to home page...");
        window.location.href = "./home.html";
    }

    else if (usernameValue === "admin" && passwordValue !== "admin123") {
        alert("Incorrect password. Please try again.");
    }

    else if (usernameValue !== "admin" && passwordValue === "admin123") {
        alert("Incorrect username. Please try again.");
    }

    else if (usernameValue === "" || passwordValue === "") {
        alert("Please enter both username and password.");
    }

    else {
        alert("Invalid username or password. Please try again.");
    }
})