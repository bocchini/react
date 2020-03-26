import axios from "axios";

const base_url = "https://rocketseat-node.herokuapp.com/api";

const api = axios.create({ baseURL: base_url });

export default api;
