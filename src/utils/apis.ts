import axios from "axios";

const thegraphAPI = axios.create({
  baseURL: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  headers: {
    "Content-Type": "application/json"
  }
});

thegraphAPI.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export { thegraphAPI };
