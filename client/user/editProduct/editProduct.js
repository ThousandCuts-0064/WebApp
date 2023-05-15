if (localStorage.getItem("isValid") === "false") {
    location = "../../login/login.html";
}

const selectedProductKey = "selectedProductId";

const namePrd = document.querySelector("#name");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const imageInput = document.querySelector("#imageInput");
const description = document.querySelector("#description");

const showProduct = async () => {
    const response = await fetch("http://localhost:3000/editProduct/id", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: localStorage.getItem(selectedProductKey),
        }),
    });
    const result = await response.json();
    const product = result.product;

    namePrd.value = product.name;
    price.value = product.price;
    const imgStr = window.btoa(
        String.fromCharCode.apply(null, product.image.data)
    );
    image.src = "data:image/png;base64," + imgStr;
    description.textContent = product.description;
};
showProduct();

document
    .querySelector("#update-btn")
    .addEventListener("click", async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("id", localStorage.getItem(selectedProductKey));
        formData.append("name", namePrd.value);
        formData.append("price", price.value);
        formData.append("description", description.value);

        if (imageInput.files[0]) {
            formData.append("image", imageInput.files[0]);
        }

        const response = await fetch(
            "http://localhost:3000/editProduct/update",
            {
                method: "POST",
                body: formData,
            }
        );
        const result = await response.json();
        if (result.isSuccess) {
            location = "../../user/user.html";
        }
    });
