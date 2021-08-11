import axios from "axios";
import qs from 'qs'
import {
    Message
} from "element-ui";

const service = axios.create({
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    baseURL: "/api",
    timeout: 5000 // 请求超时时间
});

//添加请求拦截器
service.interceptors.request.use(
    config => {
        config.data = qs.stringify(config.data)
        return config;
    },
    error => {
        Message({
            message: "加载超时",
            type: "error",
            center: true
        });
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        Message.error(error.message)
        return Promise.reject(error);
    }
);

export default service;