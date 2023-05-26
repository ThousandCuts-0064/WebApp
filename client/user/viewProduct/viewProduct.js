import { checkValidity } from "../validation.js";

checkValidity();

const selectedProductKey = "selectedProductId";

const heading = document.querySelector("#heading");
const image = document.querySelector("#image");
const description = document.querySelector("#description");

const showProduct = async () => {
    const response = await fetch("http://localhost:3000/viewProduct", {
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

    console.log(product);
    heading.textContent = product.name + ": " + product.price + "$";
    const imgStr = window.btoa(
        String.fromCharCode.apply(null, product.image.data)
    );
    image.src = "data:image/png;base64," + imgStr;
    description.textContent = product.description;
};
showProduct();
