import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useYoutube from "../hooks/useYoutube";
import { formatAgo } from "../util/date";

export default function VideoList({ channelId, currentVideoId, onVideoClick }) {
  const youtube = useYoutube();
  const [randomVideos, setRandomVideos] = useState([]);

  const {
    isLoading: listLoading,
    error: listError,
    data: listData
  } = useQuery({
    queryKey: ['related', channelId],
    queryFn: () => youtube.channelVideo(channelId),
    staleTime: 1000 * 60 * 1
  });

  const Loading = () => <div>Loading...</div>;
  const Error = ({ message }) => <div>Error: {message}</div>;

  React.useEffect(() => {
    if (listData && Array.isArray(listData)) {
      const filteredVideos = listData.filter(item => item.id.videoId !== currentVideoId);
      const shuffledVideos = [...filteredVideos].sort(() => Math.random() - 0.5);
      setRandomVideos(shuffledVideos);
    }
  }, [listData, currentVideoId]);

  if (listLoading) return <Loading />;
  if (listError) return <Error message={listError.message} />;
  if (!randomVideos || randomVideos.length === 0) return null;

  return (
    <div className="basis-1/4">
      <ul>
        {randomVideos.map((item) => {
          if (!item || !item.id || !item.snippet) return null;
          if (item.id.videoId !== currentVideoId) {
            return (
              <li
                key={item.id.videoId}
                onClick={() => onVideoClick(item.id.videoId, item.snippet.channelId)}
                className="flex gap-2 mb-3 cursor-pointer"
              >
                <div className="basis-1/2 w-[150px] h-[100px] overflow-hidden relative">
                  <img
                    className="absolute left-2/4 top-2/4 translate-y-[-50%] translate-x-[-50%]"
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                  />
                </div>
                <div className="basis-1/2">
                  <p className="line-clamp-2 text-base-200 leading-5 text-sm">{item.snippet.title}</p>
                  <div className="pt-1 text-base-300 text-sm">
                  <p>{item.snippet.channelTitle}</p>
                  <p>
                    {formatAgo(item.snippet.publishedAt)}
                  </p>
                  </div>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
