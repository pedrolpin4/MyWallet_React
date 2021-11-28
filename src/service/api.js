import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 
    "https://my-walletapp.herokuapp.com" :
    "http://localhost:4000"
    ,
})

export default API;