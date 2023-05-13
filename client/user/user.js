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

const sortMethodKey = "sortMethod";

const sortAToZ = (a, b) => a.name.localeCompare(b.name);
const sortZToA = (a, b) => b.name.localeCompare(a.name);
const sortPriceDescending = (a, b) => b.price - a.price;
const sortPriceAscending = (a, b) => a.price - b.price;

document.querySelector("#a-z").addEventListener("click", () => {
    localStorage.setItem(sortMethodKey, 1);
    location.reload();
});

document.querySelector("#z-a").addEventListener("click", () => {
    localStorage.setItem(sortMethodKey, 2);
    location.reload();
});

document.querySelector("#priceDescending").addEventListener("click", () => {
    localStorage.setItem(sortMethodKey, 3);
    location.reload();
});

document.querySelector("#priceAscending").addEventListener("click", () => {
    localStorage.setItem(sortMethodKey, 4);
    location.reload();
});

const showProducts = async (sort) => {
    const response = await fetch("http://localhost:3000/user");
    const products = await response.json();
    const productsContainer = document.querySelector("#products-container");
    products.result.sort(sort).forEach((product) => {
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

let selectedSort = sortAToZ;

switch (localStorage.getItem(sortMethodKey)) {
    case "1":
        selectedSort = sortAToZ;
        break;
    case "2":
        selectedSort = sortZToA;
        break;
    case "3":
        selectedSort = sortPriceDescending;
        break;
    case "4":
        selectedSort = sortPriceAscending;
        break;
}

showProducts(selectedSort);
