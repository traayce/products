import axios from 'axios';
import { baseURL } from 'client/helpers/baseconsts';
const request = axios.create({
  baseURL,
  headers: {
    Accept: "application/json"
  }
})
export namespace productCommands {
  export const productsApiGet = () => {
    return request
      .get(`/product`)
      .then(res => res.data)
      .catch(err => err)
  }
}

