if (localStorage.getItem("isValid") === "false") {
    location = "../auth/login/login.html";
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

(async () => {
    const generateCards = (length) => {
        const array = [];
        const productsContainer = document.querySelector("#products-container");
        for (let i = 0; i < length; i++) {
            const container = document.createElement("div");
            container.appendChild(document.createElement("h3"));
            container.appendChild(document.createElement("img"));
            container.appendChild(document.createElement("p"));
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
            card.getElementsByTagName("p")[0].textContent = product.description;
            card.addEventListener("click", () => {
                localStorage.setItem("selectedProductId", product.id);
                location = "./editProduct/editProduct.html";
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
