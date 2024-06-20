import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoDetail from "../components/VideoDetail";
import VideoList from "../components/VideoList";
import useFakeYoutube from "../hooks/useFakeYoutube";
import useYoutube from "../hooks/useYoutube";
import { formatAgo } from "../util/date";

export default function Cont() {
  const navigate = useNavigate();
  const { channelId, videoId, keyword } = useParams();
  const youtube = useYoutube();
  // const youtube = useFakeYoutube();
  const {
    isLoading: videoLoading,
    error: videoError,
    data: videoData
  } = useQuery({
    queryKey: ['detail', videoId],
    queryFn: () => youtube.detail(videoId)
  });

  const {
    isLoading: channelLoading,
    error: channelError,
    data: channelData
  } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => youtube.channel(channelId)
  });

  const {
    isLoading: resultLoading,
    error: resultError,
    data: resultData
  } = useQuery({
    queryKey: ['search', keyword],
    queryFn: () => youtube.search(keyword)
  });

  const Loading = () => <div>Loading...</div>;
  const Error = ({ message }) => <div>Error: {message}</div>;

  return (
    <div className="flex gap-5">
      <div className="basis-3/4">
        {videoLoading && <Loading />}
        {videoError && <Error message={videoError.message} />}
        {videoData && videoData.map((video) =>
          <div className="basis-3/4" key={video.id}>
            <iframe
              id="ytplayer"
              type="text/html"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              width='100%'
              height="600"
              className="rounded-sm"
            />
            <h2 className="pt-3 text-2xl">{video.snippet.title}</h2>
            <div className="flex">
              {channelLoading && <Loading />}
              {channelError && <Error message={channelError.message} />}
              {channelData && (
                <div className="flex items-center gap-2 mt-2">
                  <img 
                    className="w-[50px]"
                    src={channelData.thumbnails.default.url} 
                    alt={channelData.title} 
                  />
                  <div>
                    <p>{channelData.title}</p>
                    <p className="pb-3 text-base-200 text-sm">{channelData.publishedAt}</p>
                  </div>
                </div>
              )}
            </div>
            <p className="pt-3 text-base-200">{video.snippet.description}</p>
          </div>
        )}
      </div>
      <div className="basis-1/4">
        <ul>
          {resultLoading && <Loading />}
          {resultError && <Error message={resultError.message} />}
          {
            resultData && resultData.map((item) => (
              <li
                key={item.id}
                onClick={() => 
                  navigate(`/video/watch/${item.id.videoId}`, { state: { item } })
                }
                className="flex gap-2 mb-3 cursor-pointer">
                <div className="basis-1/2 w-[150px] h-[100px] overflow-hidden relative">
                  <img className="absolute left-2/4 top-2/4 translate-y-[-50%] translate-x-[-50%]" src={item.snippet.thumbnails.high.url} alt={item.snippet.title} />
                </div>
                <div className="basis-1/2">
                  <p className="text-sm line-clamp-2">{item.snippet.title}</p>
                  <p className="text-sm text-base-200">{formatAgo(item.snippet.publishedAt)}</p>
                </div>
              </li>
            )

            )}
        </ul>
      </div>
    </div>
  );
}