export const myXML = {};


myXML.request = async (type, data = null, callback) => {
    let result;
    const url = `https://httpbin.org/${type}`;
    const xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader("content-type",
    `${(type === 'post')? 'application/x-www-form-urlencoded': 'application/json'}`);
    xhr.send(data);
    xhr.onload = () => {callback( JSON.parse (xhr.response))};
}