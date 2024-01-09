import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { NODE_TLS_REJECT_UNAUTHORIZED, BASIC_URL, CTRLUSERNAME, PASSWORD } =
    process.env;

const getAuthData = async () => {
    try {
        const authRequest = await axios.post(`${BASIC_URL}/api/login`, {
            username: CTRLUSERNAME,
            password: PASSWORD,
        });
        const authRawData = authRequest.headers["set-cookie"];
        const csrf = authRawData?.[1].split(";")[0];
        const unifises = authRawData?.[0].split(";")[0];

        const siteNameRequest = await axios.get(`${BASIC_URL}/api/self/sites`, {
            headers: {
                Cookie: `${csrf}; ${unifises}`,
            },
        });
        const siteName = siteNameRequest.data.data[0].name;

        return [csrf, unifises, siteName];
    } catch (error) {
        console.log(error);
    }
};

// getAuthData().then(data => console.log(data));

const getAllWirelessClients = async () => {
    const data = await getAuthData();
    const listOfClientsRequest = await axios.get(
        `${BASIC_URL}/api/s/${data?.[2]}/stat/sta`,
        {
            headers: {
                Cookie: `${data?.[0]}; ${data?.[1]}`,
            },
        }
    );
    const listOfAllClients = listOfClientsRequest.data.data;
};

getAllWirelessClients().then(data =>
    data.map((item: any) =>
        console.log(item?.["is_wired"] === true ? null : item)
    )
);
