import { checkValidity } from "../validation.js";
import { checkAdmin } from "../validation.js";

checkValidity();
checkAdmin();

document.querySelector("#add-btn").addEventListener("click", async () => {
    const name = document.querySelector("#name");
    const image = document.querySelector("#imageInput");
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

imageInput.addEventListener("change", async () => {
    if (imageInput.files.length > 0)
        label.textContent = imageInput.files[0].name;
});
