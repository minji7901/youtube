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

  const popularSearch = async (keyword) => {
    return keyword ? search(keyword) : popular();
  };

  const search = async (keyword) => {
    const response = await httpClient.get('search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: keyword,
        key: apiKey
      }
    });
    return response.data.items.map(item => ({
      ...item,
      id: item.id.videoId
    }));
  };

  const popular = async () => {
    const response = await httpClient.get('videos', {
      params: {
        part: 'snippet',
        maxResults: 25,
        chart: 'mostPopular',
        key: apiKey
      }
    });
    return response.data.items;
  };

  const detail = async (videoId) => {
    const response = await httpClient.get('videos', {
      params: {
        part: 'snippet',
        id: videoId,
        key: apiKey
      }
    });
    return response.data.items[0];
  };

  const channel = async (channelId) => {
    const response = await httpClient.get('channels', {
      params: {
        part: 'snippet',
        id: channelId,
        key: apiKey
      }
    });
    return response.data.items;
  };

  const channelVideo = async (channelId) => {
    const response = await httpClient.get('search',{
      params: {
        part: 'snippet',
        type: 'video',
        channelId,
        key: apiKey
      }
    });
    return response.data.items;
  }

  return {
    popularSearch,
    search,
    popular,
    detail,
    channel,
    channelVideo
  };
}
