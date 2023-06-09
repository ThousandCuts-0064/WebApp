const isValid = "isValid";
const isAdmin = "isAdmin";
localStorage.setItem(isValid, false);
localStorage.setItem(isAdmin, false);

const registerBtn = document.querySelector("#register-btn");
registerBtn.addEventListener("click", async () => {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const passwordConfirm = document.querySelector("#passwordConfirm");

    if (username.value.length < 4) {
        username.style.borderColor = "darkred";
        setTimeout(() => {
            username.style.borderColor = "black";
        }, 3000);
        return;
    }

    if (password.value.length < 6) {
        password.style.borderColor = "darkred";
        setTimeout(() => {
            password.style.borderColor = "black";
        }, 3000);
        return;
    }

    if (password.value !== passwordConfirm.value) {
        password.style.borderColor = "darkred";
        passwordConfirm.style.borderColor = "darkred";
        setTimeout(() => {
            password.style.borderColor = "black";
            passwordConfirm.style.borderColor = "black";
        }, 3000);
        return;
    }

    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });

    const registerInfo = await response.json();
    if (registerInfo.isSuccess) {
        localStorage.setItem(isValid, true);
        location = "../../user/user.html";
    } else {
        password.value = "";
        password.style.borderColor = "darkred";
        passwordConfirm.value = "";
        passwordConfirm.style.borderColor = "darkred";
        setTimeout(() => {
            password.style.borderColor = "black";
            passwordConfirm.style.borderColor = "black";
        }, 3000);
    }
});

const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener("click", () => {
    location = "../login/login.html";
});
