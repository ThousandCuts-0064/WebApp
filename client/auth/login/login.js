const isValid = "isValid";
const isAdmin = "isAdmin";
localStorage.setItem(isValid, false);
localStorage.setItem(isAdmin, false);

const btnLogin = document.querySelector("#login-btn");
btnLogin.addEventListener("click", async () => {
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
        btnLogin.classList.replace("btn-blue", "btn-red");
        password.value = "";
        setTimeout(() => {
            btnLogin.classList.replace("btn-red", "btn-blue");
        }, 3000);
        return;
    }

    if (userFlags.isAdmin) localStorage.setItem(isAdmin, true);
    localStorage.setItem(isValid, true);
    location = "../../user/user.html";
});

const btnRegister = document.querySelector("#register-btn");
btnRegister.addEventListener("click", async () => {
    location = "../register/register.html";
});
