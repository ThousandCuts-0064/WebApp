export const checkValidity = () => {
    if (localStorage.getItem("isValid") === "false") {
        const path = location + "";
        const rootFolderName = "client";
        const rootFolder = path.substring(
            0,
            path.lastIndexOf(rootFolderName) + rootFolderName.length
        );
        location = rootFolder + "/auth/login/login.html";
    }
};

export const checkAdmin = () => {
    if (localStorage.getItem("isAdmin") === "false") {
        const path = location + "";
        const rootFolderName = "client";
        const rootFolder = path.substring(
            0,
            path.lastIndexOf(rootFolderName) + rootFolderName.length
        );
        location = rootFolder + "/user/user.html";
    }
};
