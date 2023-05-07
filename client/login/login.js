// const btn = document.querySelector("#login-btn");
// btn.addEventListener("click", () => {
//     fetch("http://localhost:3000/products")
//         .then((response) => response.text())
//         .then((data) => console.log(data))
//         .catch((error) => console.error(error));
// });

const btn = document.querySelector("#login-btn");
btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    // const userInfo = new FormData();
    // userInfo.append("username", username);
    // userInfo.append("password", password);
    const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });
    // const isAdmin = await response.json();
    // console.log(isAdmin);
    console.log(response);
});

// location = "../user/user.html";
