const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("submitButton");
const statusEl = document.getElementById("statusEl");
button.addEventListener("click", sendRequest);
async function sendRequest() {
    const data = {
        "email": email.value,
        "password": password.value,
        "username": username.value
    };

    email.value = "";
    password.value = "";
    username.value = "";

    const url = "http://localhost:5000/createaccount";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    await fetch(url, options).then(async response => {
        const jsonResponse = await response.json();
        if (jsonResponse.success === !0) {
            statusEl.textContent = "Account Created!"
        } else {
            statusEl.textContent = jsonResponse.cause
        }
    })
}