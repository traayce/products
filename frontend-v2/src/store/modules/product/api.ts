import axios from "axios";
const baseURL: string = "http://localhost:5000/api";
const request = axios.create({
  baseURL,
  headers: {
    Accept: "application/json"
  }
});
export namespace productCommands {
  export const productsApiGet = () => {
    return request
      .get(`/product/v1.1`)
      .then(res => res.data)
      .catch(err => err);
  };
}

