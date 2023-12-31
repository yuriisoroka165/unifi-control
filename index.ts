import axios, { AxiosResponse } from "axios";
import * as https from "https";

const agent = new https.Agent({ rejectUnauthorized: false });

axios
    .post(
        "https://192.168.30.174:8443/api/login",
        {
            username: "admin",
            password: "admin330691",
        },
        { httpsAgent: agent }
    )
    .then(response => console.log(response));
