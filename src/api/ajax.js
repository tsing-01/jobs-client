// default: ajax request module
import axios from 'axios'

import { config } from '../config/index.js';
const BASE_URL = config[process.env.NODE_ENV].BASE_URL;
const server = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export default function ajax(url, data = {}, type = "GET") {
    if (type.toUpperCase() === "GET") {
        // join strings
        let paramStr = "";
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&';
        })
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1);
        }
        // axisos get request
        return server.get(url + '?' + paramStr)
    } else {
        // axisos post request
        return server.post(url, data);
    }
}