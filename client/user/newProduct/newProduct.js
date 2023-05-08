const isValid = "isValid";
const isAdmin = "isAdmin";
localStorage.setItem(isValid, false);
localStorage.setItem(isAdmin, false);

// const image = document.querySelector("#image");
// let binaryData;
// image.addEventListener("change", (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.addEventListener("load", (event) => {
//         binaryData = event.target.result;
//     });

//     reader.readAsArrayBuffer(file);
// });

document.querySelector("#add-btn").addEventListener("click", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("price", price.value);
    formData.append("image", image.files[0]);
    formData.append("description", description.value);

    // for (var key of formData.entries()) {
    //     console.log(key[0] + ", " + key[1]);
    // }

    // const response = await fetch("http://localhost:3000/newProduct", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    //     body: formData,
    // });

    console.log(...formData);
    const response = await fetch("http://localhost:3000/newProduct", {
        method: "POST",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: formData,
    });

    const msg = await response.json();
});
