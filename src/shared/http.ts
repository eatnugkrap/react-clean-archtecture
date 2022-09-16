import axios from "axios";

const BASE_URL = "https://my-json-server.typicode.com/eatnug/jsonServer/";

const client = axios.create({ baseURL: BASE_URL });

export default client;
