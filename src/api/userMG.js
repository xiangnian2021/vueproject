import axios from 'axios';
import { loginreq, req } from './axiosFun';

// 登录接口 
export const login = (params) => { return loginreq("post", "/api/login/login", params) };

//上传
export const fileUpd = (params) => { return  axios.post('/api/frontframe/api/upload/',
 params, {headers: {'Content-Type': 'multipart/form-data','Authorization':'Bearer ' +localStorage.getItem('logintoken') }})};

 //下载
 export const exportDownload = (params) => { return axios.post("/api/frontframe/api/download/",
 {responseType: "blob"},{headers: {'Content-Type': 'charset=UTF-8','Authorization':'Bearer ' +localStorage.getItem('logintoken')}}) };

 //上传状体
 export const fileStatus = (params) => { return  axios.get('/api/frontframe/api/getstatus', {headers: {'Authorization':'Bearer ' +localStorage.getItem('logintoken') }})};

 // 获取用户菜单
export const menu = (params) => { return axios.get("/api/menu?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 退出接口
export const loginout = () => { return axios.delete("/api/login?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
