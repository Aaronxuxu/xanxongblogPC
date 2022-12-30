import axios from "axios";
import { GET, API } from "../util/constant";
axios.defaults.timeout = 5 * 1000;

export default function ajax(url, method = GET, data = {}) {
  return new Promise(function (resolve) {
    url = `${API}${url}`;
    let promise;
    if (method === GET) {
      promise = axios.get(url, { params: data });
    } else {
      promise = axios.post(url, data);
    }
    promise
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        const { status } = err.response;
      });
  });
}
