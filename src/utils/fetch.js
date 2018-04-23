import axios from 'axios'
import {Loading } from 'element-ui'
// 创建axios实例
const service = axios.create({
    timeout: 60000, // 请求超时时间
    withCredentials: false
})
let loadingInstance,
    errorMsg = '',
    i = 0;
// request拦截器
service.interceptors.request.use(config => {
    i++;
    loadingInstance = Loading.service();
    return config
}, error => {
    console.log(error) // 请求出错时
    Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
    response => {
        i--;
        if (i === 0) loadingInstance.close();
      return Promise.resolve(response.data);
    },
    error => {
        i--;
        if (i === 0) loadingInstance.close();
        return Promise.reject(error)
    }
)

export default service
