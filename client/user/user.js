if (localStorage.getItem("isValid") === "false") {
    location = "../login/login.html";
}

if (localStorage.getItem("isAdmin") === "true") {
    const navbar = document.querySelector("#navbar");
    const editBtn = document.createElement("li");
    const editBtnAnchor = document.createElement("a");
    editBtnAnchor.href = "#";
    editBtnAnchor.textContent = "Edit";
    editBtn.appendChild(editBtnAnchor);
    navbar.appendChild(editBtn);
}

const getProducts = async () => {
    const response = await fetch("http://localhost:3000/user");
    const products = await response.json();
    const productsContainer = document.querySelector("#products-container");
    products.result.forEach((product) => {
        console.log(product.image.data);
        const imgStr = window.btoa(
            String.fromCharCode.apply(null, product.image.data)
        );
        const container = document.createElement("div");
        container.setAttribute("id", "product-container");
        container.append(
            (document.createElement("h3").value =
                product.name + ": " + product.price + "$")
        );
        const image = document.createElement("img");
        image.src = "data:image/png;base64," + imgStr;
        container.append(image);
        container.append(
            (document.createElement("p").value = product.description)
        );
        productsContainer.appendChild(container);
    });
};
getProducts();
