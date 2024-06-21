import axios from "axios";

export default function useYoutubeServer() {
  const httpClient = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
    params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
  });
  const search = async ({ params }) => {
    return httpClient.get('search', { params });
  };

  const videos = async ({ params }) => {
    return httpClient.get('videos', { params });
  };

  const channel = async ({ params }) => {
    return httpClient.get('channels', { params });
  };

  return {
    search,
    videos,
    channel
  };
}