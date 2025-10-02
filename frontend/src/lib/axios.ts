import axios from "axios";

const codeVerseApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


export { codeVerseApi };