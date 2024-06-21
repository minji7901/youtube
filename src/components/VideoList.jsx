import React from "react";
import { useQuery } from "@tanstack/react-query";
import Video from "../components/Video"
import useYoutube from "../hooks/useYoutube";
import { useParams } from "react-router-dom";

export default function VideoList({ channelId }) {
  const youtube = useYoutube();
  const { keyword } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['related', channelId],
    queryFn: () => youtube.searchVideo(keyword),
    staleTime: 1000 * 60 * 1
  });

  return (
    <div className="basis-1/4">
      <ul className="grid gap-5">
        {isLoading && <li>loading</li>}
        {error && <li>error: {error.message}</li>}
        {data && data.map((item) => 
          <Video key={item.id} item={item} type='related' />
        )}
      </ul>
    </div>
  );
}
