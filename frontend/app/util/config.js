import env from './../../env.json';
let api_url = env.API_URL;
if (env.DEVELOPMENT) {
  api_url = 'localhost:300';
}

export default api_url;

// TODO: Better way to get the API key?
const apiKey = env.API_KEY;
const googleVisionUrl = `${env.VISION_URL}?key=${apiKey}`;
export { googleVisionUrl, apiKey };
