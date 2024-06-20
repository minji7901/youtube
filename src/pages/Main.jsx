import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFakeYoutube from "../hooks/useFakeYoutube";
import { formatAgo } from "../util/date";
import { useQuery } from "@tanstack/react-query";
import useYoutube from "../hooks/useYoutube";

export default function Main() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  // const youtube = useFakeYoutube();
  const youtube = useYoutube();
  const { isLoading, error, data } = useQuery({
    queryKey: ['videos', keyword], 
    queryFn: () => youtube.popularSearch(keyword)
  });

  return (
    <ul className="grid grid-cols-5 gap-4">
      {isLoading && "loading"}
      {error && `'error ' ${error.message}`}
      {data && data.map((item) => 
        <li
          className="cursor-pointer" 
          onClick={()=>{
          navigate(`/video/watch/${item.id}`,{state: {item}})}} 
          key={item.id}
          >
          <img 
            src={item.snippet.thumbnails.standard.url} 
            className="rounded-xl" 
          />
          <p className="pt-2 line-clamp-2">{item.snippet.title}</p>
          <p className="py-1 text-sm text-base-300">{item.snippet.channelTitle}</p>
          <p className="text-base-300 text-sm">{formatAgo(item.snippet.publishedAt)}</p>
        </li>
      )}
    </ul>
  );
}
