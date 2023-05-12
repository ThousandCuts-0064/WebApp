if (localStorage.getItem("isValid") === "false") {
    location = "../login/login.html";
}

if (localStorage.getItem("isAdmin") === "true") {
    const navbar = document.querySelector("#navbar");
    const newBtn = document.createElement("li");
    const newBtnAnchor = document.createElement("a");
    newBtnAnchor.href = "./newProduct/newProduct.html";
    newBtnAnchor.textContent = "New";
    newBtn.appendChild(newBtnAnchor);
    navbar.appendChild(newBtn);
}

const showProducts = async () => {
    const response = await fetch("http://localhost:3000/user");
    const products = await response.json();
    const productsContainer = document.querySelector("#products-container");
    products.result.forEach((product) => {
        const imgStr = window.btoa(
            String.fromCharCode.apply(null, product.image.data)
        );

        const container = document.createElement("div");
        container.setAttribute("id", "product-container");

        const h3 = document.createElement("h3");
        h3.textContent = product.name + ": " + product.price + "$";
        container.appendChild(h3);

        const image = document.createElement("img");
        image.src = "data:image/png;base64," + imgStr;
        container.append(image);

        const p = document.createElement("p");
        p.textContent = product.description;
        container.append(p);

        productsContainer.appendChild(container);

        container.addEventListener("click", () => {
            localStorage.setItem("selectedProductId", product.id);
            location = "./editProduct/editProduct.html";
        });
    });
};
showProducts();
