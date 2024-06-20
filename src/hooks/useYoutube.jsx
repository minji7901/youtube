import axios from "axios";

export default function useYoutube() {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error("YOUTUBE_API_KEY is not defined in the environment variables");
    return;
  }
  
  const httpClient = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
  });

  const fetchData = async (endpoint, params) => {
    try {
      const response = await httpClient.get(endpoint, { params: { ...params, key: apiKey } });
      return response.data.items;
    } catch (error) {
      throw new Error(`Error fetching data from YouTube API: ${error.message}`);
    }
  };

  const popularSearch = async (keyword) => {
    return keyword ? search(keyword) : popular();
  };

  const search = async (keyword) => {
    const items = await fetchData('search', {
      part: 'snippet',
      maxResults: 25,
      type: 'video',
      q: keyword
    });
    return items.map(item => ({ ...item, id: item.id.videoId }));
  };

  const popular = async () => {
    return fetchData('videos', {
      part: 'snippet',
      maxResults: 25,
      chart: 'mostPopular'
    });
  };

  const detail = async (videoId) => {
    return fetchData('videos', {
      part: 'snippet',
      id: videoId
    });
  };

  const channel = async (channelId) => {
    const items = await fetchData('channels', {
      part: 'snippet',
      maxResults: 25,
      id: channelId
    });
    return items[0].snippet;
  };

  return {
    popularSearch,
    search,
    popular,
    detail,
    channel
  };
}
