/**
 * user api
 */
 import axios from "axios";
 const BASEURL = "http://10.53.137.235:8080/api";
 const serverInstanec = axios.create();
 serverInstanec.defaults.baseURL = BASEURL;
 
 /**
  * axios interceptors
  */
 serverInstanec.interceptors.request.use(config => {
     config.headers['X-Access-Token'] = window.localStorage.getItem("access_token");
     return config;
 });
 
 const doMessage = (message, isError = true) => {
    window.indexVue.$message({ type: isError ? 'error' : 'success', message })
}

 /**
  * axios common
  * @param {*} url 
  * @param {*} params 
  * @param {*} method 
  */
 const getDataAxios = (url = "", params = {}, method = "get") => {
     const option = { url, method };
     method == 'get' ? option.params = params : option.data = params;
     return serverInstanec.request(option).then(res => {
         //  status判断登录状态 
         if (res.data.status == 500) {
             doMessage(res.data.message);
             return Promise.reject(res.data.message)
         }
         //  code判断业务错误
         if (res.data.code == 200) {
             return Promise.resolve(res.data.result);
         } else {
             doMessage(res.data.message)
             return Promise.reject(res.data.message)
         }
     });
 };
 
 /**
  *  verify user with token
  */
//  export const test = () => {
//      return getDataAxios("/dm/statistics/all")
//  }
export default{
    getDataAxios,
}