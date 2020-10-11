import axios from "axios";

//const URL = "https://api.openweatermap.org/data/2.5/weather";
//const URL = "http://localhost:3333/uploader-1/rest/weather";
const URL = "http://localhost:3333/weathers";

const API_KEY = "ffaabbccddeeff";

export const fetchData = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });

  console.log(data);

  return data;
};
