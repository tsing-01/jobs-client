// default: ajax request module
import axios from 'axios'

import { config } from '../config/index.js';
const BASE_URL = config[process.env.NODE_ENV].BASE_URL;

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
        return axios.get(BASE_URL + url + '?' + paramStr)
    } else {
        // axisos post request
        return axios.post(BASE_URL + url, data);
    }
}