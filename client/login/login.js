const isValid = "isValid";
const isAdmin = "isAdmin";
localStorage.setItem(isValid, false);
localStorage.setItem(isAdmin, false);

const btnLogin = document.querySelector("#login-btn");
btnLogin.addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });

    const userFlags = await response.json();
    if (!userFlags.isSuccess) {
        btnLogin.style.backgroundColor = "red";
        password.value = "";
        setTimeout(() => {
            btnLogin.style.backgroundColor = "cyan";
        }, 3000);
        return;
    }

    if (userFlags.isAdmin) localStorage.setItem(isAdmin, true);
    localStorage.setItem(isValid, true);
    location = "../user/user.html";
});

const btnRegister = document.querySelector("#register-btn");
btnRegister.addEventListener("click", async (event) => {
    location = "../register/register.html";
});
