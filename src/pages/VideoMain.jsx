import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatAgo } from "../util/date";
import { useQuery } from "@tanstack/react-query";
import useYoutube from "../hooks/useYoutube";

export default function VideoMain() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const youtube = useYoutube();
  const { isLoading, error, data } = useQuery({
    queryKey: keyword ? ['search', keyword] : ['popular'], 
    queryFn: () => youtube.popularSearch(keyword),
    staleTime: 1000 * 60 * 1
  });

  return (
    <ul className="grid grid-cols-5 gap-4">
      {isLoading && "loading"}
      {error && `'error ' ${error.message}`}
      {data && data.map((item) => 
        <li
          className="cursor-pointer" 
          onClick={()=>{
          navigate(`/video/watch/${item.id}`,{state: {videoId:item.id, channelId: item.snippet.channelId}})}} 
          key={item.id}
          >
          <img 
            className="rounded-xl" 
            src={item.snippet.thumbnails.high.url}
            alt={item.snippet.title} 
          />
          <p className="pt-2 line-clamp-2">{item.snippet.title}</p>
          <p className="py-1 text-sm text-base-300">{item.snippet.channelTitle}</p>
          <p className="text-base-300 text-sm">{formatAgo(item.snippet.publishedAt)}</p>
        </li>
      )}
    </ul>
  );
}
