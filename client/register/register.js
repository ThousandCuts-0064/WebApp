const isValid = "isValid";
const isAdmin = "isAdmin";
localStorage.setItem(isValid, false);
localStorage.setItem(isAdmin, false);

const btn = document.querySelector("#register-btn");
btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const passwordConfirm = document.querySelector("#passwordConfirm");

    if (password.value !== passwordConfirm.value) {
        password.style.borderColor = "red";
        passwordConfirm.style.borderColor = "red";
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
    if (registerInfo.registerSuccess) {
        localStorage.setItem(isValid, true);
        location = "../user/user.html";
    } else {
        password.value = "";
        password.style.borderColor = "red";
        passwordConfirm.value = "";
        passwordConfirm.style.borderColor = "red";
        setTimeout(() => {
            password.style.borderColor = "black";
            passwordConfirm.style.borderColor = "black";
        }, 3000);
    }
});
