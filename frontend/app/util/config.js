console.log(__DEV__);
let api_url = 'http://10.0.2.2:3000/'
if (false) { // TODO: This is the production config
  api_url = 'https://mcc-fall-2019-g20.appspot.com/';
}

export default api_url;