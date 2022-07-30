export const fetchAPI = {};

fetchAPI.request = async (type, data = null, callback) => {
    let url = `https://httpbin.org/${type}`;
    
    console.log(data);
    const option = {
        method : type
    }
    if (data != null && type != 'get') option.body = data;

    if (type === 'get') 
    { 
      url += `?${data}`;
      option.headers = {"Accept": "text/html"}
    }
    else if (type === 'post')
      option.headers = {"Content-Type": "application/x-www-form-urlencoded"}
    
     
  return fetch(url, option)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
};
