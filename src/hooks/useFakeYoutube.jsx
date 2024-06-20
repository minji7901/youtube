import axios from "axios";

export default function useFakeYoutube() {
  const popularSearch = async (keyword) => {
    return keyword ? search(keyword) : popular();
  };
  const search = async () => {
    const response = await axios.get('/data/result.json');
    return response.data.items.map(item => ({
      ...item,
      id: item.id.videoId
    }));
  };

  const popular = async () => {
    const response = await axios.get('/data/popular.json');
    return response.data.items;
  };

  const detail = async () => {
    const response = await axios.get('/data/video.json');
    return response.data.items;
  };

  const channel = async () => {
    const response = await axios.get('/data/channel.json');
    return response.data.items[0].snippet;
  };

  return {
    popularSearch,
    search,
    popular,
    detail,
    channel
  };
}
