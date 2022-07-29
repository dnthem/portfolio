export const fetchAPI = {};

fetchAPI.request = async (type, data = null, callback) => {
    const option = {
        method : type
    }
    if (data != null) option.body = data;
    option.headers = (type === 'post')?
    {"Content-Type": "application/x-www-form-urlencoded"}:{ "accept" : "application/json"} ;
     
  return fetch(`https://httpbin.org/${type}`, option)
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
