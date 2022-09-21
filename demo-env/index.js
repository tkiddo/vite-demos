console.log("name", import.meta.env.VITE_NAME);
console.log("db-name", import.meta.env.DB_NAME);

document.getElementById("name").innerHTML = import.meta.env.VITE_NAME;
