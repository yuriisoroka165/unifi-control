import axios from "axios";


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let csrf = null;


axios
    .post("https://192.168.30.174:8443/api/login", {
        username: "admin",
        password: "admin330691",
    })
    .then(response => csrf = response.headers["set-cookie"]);



