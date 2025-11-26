import axios from "axios";

class Http {
  constructor() {
    this.instance = axios.create({
      // baseURL: "http://127.0.0.1:8000",
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 6000,
    });
  }
  post(path, data) {
    // return this.instance.post(path, data);

    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.instance.post(path, data);
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }
  get(path, params) {
    return this.instance.get(path, params);
  }
}

// const http = new Http();
// http.instance.post()

export default new Http();
