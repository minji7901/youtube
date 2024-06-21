import React from "react";
import { useQuery } from "@tanstack/react-query";
import useYoutube from "../hooks/useYoutube";

export default function VideoDetail({ videoId, channelId }) {
  const youtube = useYoutube();
  const { isLoading, error, data: videoData } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => youtube.detailVideo(videoId),
    staleTime: 1000 * 60 * 1
  });
  const { data: channelUrl } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => youtube.channelVideo(channelId),
    staleTime: 1000 * 60 * 1
  });

  return (
    <>
      {isLoading && <p>loading</p>}
      {error && <p>error: {error.message}</p>}
      {videoData && (
        <div className="basis-3/4" key={videoData.id}>
          <iframe
            id="ytplayer"
            type="text/html"
            src={`https://www.youtube.com/embed/${videoData.id}?autoplay=1`}
            width="100%"
            height="600"
            className="rounded-2xl"
            title={videoData.snippet.title}
          />
          <h1 className="my-2 text-2xl text-text-primary font-bold">
            {videoData.snippet.title}
          </h1>
          <div className="flex items-center gap-2">
            <img
              className="w-7 h-7 rounded-full"
              src={channelUrl}
              alt={videoData.snippet.title}
            />
            <h2 className="text-black">
              {videoData.snippet.title}
            </h2>
          </div>
          <div className="mt-5 p-3 bg-[#eee] rounded-2xl">
            <pre className="whitespace-pre-wrap text-black">
              {videoData.snippet.description}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}