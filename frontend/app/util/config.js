console.log(__DEV__);
let api_url = 'http://10.0.2.2:3000'
if (false) { // TODO: This is the production config
  api_url = 'https://mcc-fall-2019-g20.appspot.com';
}

export default api_url;

// TODO: Better way to get the API key?
const apiKey = 'AIzaSyCrywTxXbwLS6kl1rciQHLCJ8cIeVr-DE4';
const googleVisionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
export { googleVisionUrl, apiKey };
