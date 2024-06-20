import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoDetail from "../components/VideoDetail";
import VideoList from "../components/VideoList";

export default function VideoCont() {
  const navigate = useNavigate();
  const location = useLocation();
  const { channelId, videoId } = location.state;

  const [currentVideoId, setCurrentVideoId] = useState(videoId);

  const handleVideoClick = (clickedVideoId, clickedChannelId) => {
    setCurrentVideoId(clickedVideoId);
    navigate(`/video/watch/${clickedVideoId}`, { state: { videoId: clickedVideoId, channelId: clickedChannelId } });
  };

  return (
    <div className="flex gap-5">
      <VideoDetail videoId={currentVideoId} channelId={channelId} />
      <VideoList
        channelId={channelId}
        currentVideoId={currentVideoId}
        onVideoClick={handleVideoClick}
      />
    </div>
  );
}
