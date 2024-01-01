import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { BASIC_URL, NODE_TLS_REJECT_UNAUTHORIZED } = process.env;

let csrfToken = null;

const getAuthData = async () => {
    const request = await axios.post(`${BASIC_URL}/api/login`, {
        username: "admin",
        password: "admin330691",
    });
    const rawData = request.headers["set-cookie"];
    const csrf = rawData?.[1].split(";")[0];
    const unifises = rawData?.[0].split(";")[0];

    return [csrf, unifises];
};

const tryToGetDataFromController = async () => {
    const cookieData = await getAuthData();
    const request = await axios.get(`${BASIC_URL}/api/self/sites`, {
        headers: {
            Cookie: `${cookieData[0]}; ${cookieData[1]}`,
        },
    });
    const siteName = request.data.data[0].name;
    return siteName;
};

