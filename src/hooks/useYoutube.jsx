import useYoutubeServer from "./useYoutubeServer";
import useFakeYoutube from "./useFakeYoutube";

export default function useYoutube() {
  const {search, videos, channel} = useYoutubeServer();
  // const {search, videos, channel} = useFakeYoutube();

  const searchVideo = async (keyword) => {
    return keyword ? searchByKeyword(keyword) : popularVideo();
  };

  const searchByKeyword = async (keyword) => {
    const res = await search({
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: `${keyword} onepiece`
      },
    })
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
  }
  const popularVideo = async () => {
    const res = await search({
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: "onepiece",
      },
    })
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
  };

  const detailVideo = async (videoId) => {
    const res = await videos({
      params: {
        part: 'snippet',
        id: videoId,
      }
    });
    return res.data.items[0];
  };

  const channelVideo = async (id) => {
    const res = await channel({
      params: { 
        part: 'snippet', 
        id
      }
    });
    return res.data.items[0].snippet.thumbnails.default.url;
  }

  return {
    searchVideo,
    detailVideo,
    popularVideo,
    channelVideo,
  };
}
