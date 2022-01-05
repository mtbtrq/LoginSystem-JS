const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const submitButton = document.getElementById("submitButton");
const statusEl = document.getElementById("statusEl");
submitButton.addEventListener('click', sendRequest);

async function sendRequest() {
    const data = {
        "email": emailEl.value,
        "password": passwordEl.value
    }

    emailEl.value = "";
    passwordEl.value = "";
    
    const url = "http://localhost:5000/signin"
    
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
            statusEl.textContent = `Signed in as: ${jsonResponse["username"]}`;
        } else {
            statusEl.textContent = jsonResponse.cause
        }
    })
};