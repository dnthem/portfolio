export const myXML = {};

function setUp (type, url, data) {
    const result = {};
    result.url = url;
    if (type === 'get') {
        result.headers = 'Accept';
        result.headerVal = 'text/html';
        result.url += `?${data}`;
        result.data = null;
    }
    else if (type === 'post') {
        result.headers = 'content-type';
        result.headerVal = 'application/x-www-form-urlencoded';
        result.data = data;
    }
    else  {
        result.header = 'Accept';
        result.headerVal = 'application/json';
        result.data = data;
    }
    
    return result;
}

myXML.request = async (type, data = null, callback) => {
    const url = `https://httpbin.org/${type}`;
    const xhr = new XMLHttpRequest();
    const setUpObj = setUp(type,url, data);
    console.log(setUpObj);
    xhr.open(type, setUpObj.url, true);
    xhr.setRequestHeader(setUpObj.headers, setUpObj.headerVal);

    xhr.send(setUpObj.data);
    xhr.onload = () => {callback( JSON.parse (xhr.response))};
}