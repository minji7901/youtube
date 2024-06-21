import React from "react";
import { useLocation } from "react-router-dom";
import VideoDetail from "../components/VideoDetail";
import VideoList from "../components/VideoList";

export default function Cont() {
  const location = useLocation();
  const { videoId, channelId } = location.state;
  return (
    <div className="flex gap-5 flex-col xl:flex-row">
      <VideoDetail videoId={videoId} channelId={channelId} />
      <VideoList videoId={videoId} channelId={channelId} />
    </div>
  );
}