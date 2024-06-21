import axios from "axios";

export default function useFakeYoutube() {
  const search = async () => {
    return axios.get('/data/search.json');
  };
  const videos = async ({ keyword }) => {
    return axios.get(`/data/${keyword? 'video' : 'popular' }.json`);
  };
  const channel = async () => {
    return axios.get('/data/channel.json');
  };
  return {
    search,
    videos,
    channel
  };
}
