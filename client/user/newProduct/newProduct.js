if (localStorage.getItem("isValid") === "false") {
    location = "../../login/login.html";
}

document.querySelector("#add-btn").addEventListener("click", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name");
    const image = document.querySelector("#image");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("price", price.value);
    formData.append("image", image.files[0]);
    formData.append("description", description.value);

    const response = await fetch("http://localhost:3000/newProduct", {
        method: "POST",
        body: formData,
    });
    const result = await response.json();
    if (result.isSuccess) {
        location = "../../user/user.html";
    }
});
