if (localStorage.getItem("isValid") === "false") {
    location = "../../login/login.html";
}

const namePrd = document.querySelector("#name");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const description = document.querySelector("#description");

const formData = new FormData();

const updateProduct = async () => {
    const response = await fetch("http://localhost:3000/editProduct", {
        method: "POST",
        body: formData,
    });
    const product = await response.json();

    console.log(product);

    namePrd.textContent = product.name;
    price.textContent = product.price;
    description.textContent = product.description;

    document
        .querySelector("#update-btn")
        .addEventListener("click", async (event) => {
            event.preventDefault();

            formData.append("id", localStorage.getItem("selectedProductId"));
            formData.append("name", namePrd.value);
            formData.append("price", price.value);
            formData.append("image", image.files[0]);
            formData.append("description", description.value);
        });
};
updateProduct();
