import React from "react";
import { useQuery } from "@tanstack/react-query";
import useYoutube from "../hooks/useYoutube";

export default function VideoDetail({ videoId, channelId }) {
  const youtube = useYoutube();

  const {
    isLoading: videoLoading,
    error: videoError,
    data: videoData
  } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => youtube.detail(videoId),
    staleTime: 1000 * 60 * 5
  });

  const {
    isLoading: channelLoading,
    error: channelError,
    data: channelData
  } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => youtube.channel(channelId),
    staleTime: 1000 * 60 * 5
  });

  const Loading = () => <div>Loading...</div>;
  const Error = ({ message }) => <div>Error: {message}</div>;

  if (videoLoading || channelLoading) return <Loading />;
  if (videoError) return <Error message={videoError.message} />;
  if (channelError) return <div>Error: {channelError.message}</div>;
  if (!videoData || !channelData) return null;

  const { id, snippet } = videoData;
  const { thumbnails, title } = channelData[0].snippet;

  return (
    <div className="basis-3/4" key={id}>
      <iframe
        id="ytplayer"
        type="text/html"
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        width="100%"
        height="600"
        className="rounded-sm"
        title={title}
      />
      <h2 className="my-6 text-2xl">{snippet.title}</h2>
      <div className="flex items-center gap-2 pt-3 border-t border-base-300">
        <img
          className="w-10 h-10 rounded-full"
          src={thumbnails.default.url}
          alt={title}
        />
        <p>{title}</p>
      </div>
      <pre className="pt-10 whitespace-pre-wrap text-base-200">
        {snippet.description}
      </pre>
    </div>
  );
}
