import instance from "./instance";

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
        return instance.get(url + '?' + paramStr)
    } else {
        // axisos post request
        return instance.post(url, data);
    }
}