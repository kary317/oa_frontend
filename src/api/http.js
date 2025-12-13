import axios from "axios";
import { useAuthStore } from "@/stores/auth";

class Http {
  constructor() {
    this.instance = axios.create({
      // baseURL: "http://127.0.0.1:8000",
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 6000,
    });

    // axios提供的interceptors拦截器,类似于django的中间件
    // 响应之后的拦截this.instance.interceptors.response.use
    // 响应之前的拦截this.instance.interceptors.request.use
    this.instance.interceptors.request.use((config) => {
      const authStore = useAuthStore();
      const token = authStore.token;
      if (token) {
        config.headers.Authorization = "JWT " + token;
      }
      return config;
    });
  }
  post(path, data) {
    // 同步的方式
    // return this.instance.post(path, data);

    // 改为异步的方式
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.instance.post(path, data);
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }

  // 同步的方式
  // get(path, params) {
  //   return this.instance.get(path, params);
  // }

  //改为异步的方式
  get(path, params) {
    return new Promise(async (resolve, reject) => {
      try {
        // let response = await this.instance.get(path, params);
        // 处理小bug
        let response = await this.instance.get(path, { params });
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }
  put(path, data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.instance.put(path, data);
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }
  delete(path) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.instance.delete(path);
        // 因为服务端的delete方法，只是返回一个状态码，并没有数据，所以直接把result返回回去就可以了
        resolve(response);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }
}

// const http = new Http();
// http.instance.post()

export default new Http();
