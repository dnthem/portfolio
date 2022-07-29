export const fetchAPI = {};

fetchAPI.fetch = async (type, data = null) => {
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
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
};
