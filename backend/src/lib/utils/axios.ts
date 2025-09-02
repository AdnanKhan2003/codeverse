import axios from "axios";

const pistonAPI = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

export { pistonAPI };