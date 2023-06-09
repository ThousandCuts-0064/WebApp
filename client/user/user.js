import { checkValidity } from "./validation.js";

checkValidity();

const isAdmin = localStorage.getItem("isAdmin");

if (isAdmin === "true") {
    const navbar = document.querySelector("#navbar");
    const newBtn = document.createElement("li");
    const newBtnAnchor = document.createElement("a");
    newBtnAnchor.href = "./newProduct/newProduct.html";
    newBtnAnchor.textContent = "New";
    newBtn.appendChild(newBtnAnchor);
    navbar.appendChild(newBtn);
}

document.querySelector("#logout").addEventListener("click", () => {
    localStorage.clear();
});

(async () => {
    const generateCards = (length) => {
        const array = [];
        const productsContainer = document.querySelector("#products-container");
        for (let i = 0; i < length; i++) {
            const container = document.createElement("div");
            container.classList.add("clickable");
            container.append(document.createElement("h3"));
            container.append(document.createElement("img"));
            container.append(document.createElement("p"));
            productsContainer.appendChild(container);
            array.push(container);
        }
        return array;
    };

    const displayProducts = () => {
        products.forEach((product, i) => {
            const card = cards[i];
            const imgStr = window.btoa(
                String.fromCharCode.apply(null, product.image.data)
            );
            card.setAttribute("id", product.id);
            card.classList.add("product-container");
            card.classList.add("defaultText");
            card.getElementsByTagName("h3")[0].textContent =
                product.name + ": " + product.price + "$";
            card.getElementsByTagName("img")[0].src =
                "data:image/png;base64," + imgStr;
            // card.getElementsByTagName("p")[0].textContent = product.description;
            card.addEventListener("click", () => {
                localStorage.setItem("selectedProductId", product.id);

                if (isAdmin === "true")
                    location = "./editProduct/editProduct.html";
                else location = "./viewProduct/viewProduct.html";
            });
        });
    };

    const response = await fetch("http://localhost:3000/user");
    const result = await response.json();
    const products = result.result;
    const cards = generateCards(products.length);
    displayProducts();

    const sortAToZ = (a, b) => a.name.localeCompare(b.name);
    const sortZToA = (a, b) => b.name.localeCompare(a.name);
    const sortPriceDescending = (a, b) => b.price - a.price;
    const sortPriceAscending = (a, b) => a.price - b.price;

    document.querySelector("#a-z").addEventListener("click", () => {
        products.sort(sortAToZ);
        displayProducts();
    });

    document.querySelector("#z-a").addEventListener("click", () => {
        products.sort(sortZToA);
        displayProducts();
    });

    document.querySelector("#priceDescending").addEventListener("click", () => {
        products.sort(sortPriceDescending);
        displayProducts();
    });

    document.querySelector("#priceAscending").addEventListener("click", () => {
        products.sort(sortPriceAscending);
        displayProducts();
    });
})();
