import axios from 'axios'
import {getUserLogged} from "../util/auth";

let getUrl = function(){
    return `${process.env.URL ? ('http://' + process.env.URL) : 'http://localhost:3000'}/consultoria/api/v1/auth`
}

const api = axios.create({
    baseURL: getUrl()
    //baseURL: 'http://localhost:3000/consultoria/api/v1/auth',
})

// api.interceptors.request.use((config) => {
//     const user = getUserLogged()
//     if(!user) throw 'Usuario nao logado'

//     config.headers.client = user['client'];
//     config.headers.uid = user['uid'];
//     config.headers['access-token'] = user['access-token'];
//     return config;
// }, (error) => {
//     console.log('entrei')

//     return Promise.reject(error);
// });
api.interceptors.response.use((config) => {

    if(config.status === 401) {
        localStorage.clear()
    }

    return config;
}, (error) => {
    if(error.toString().includes('401')) {
        localStorage.clear()
    }

    return Promise.reject(error);
});

export default api
