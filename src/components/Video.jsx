import React from 'react';
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";

export default function Video({ item, type }) {
  const navigate = useNavigate();
  return (
    <li
      className={type === "related" ? "flex gap-3 cursor-pointer" : "cursor-pointer"}
      onClick={() => {
        navigate(`/video/watch/${item.id}`,
          {
            state: {
              videoId: item.id,
              channelId: item.snippet.channelId
            }
          }
        )
      }}
    >
      <img
        className={type === "related" ? "w-40 rounded-xl" : "rounded-xl"}
        src={item.snippet.thumbnails.high.url}
        alt={item.snippet.title}
      />
      <div className={type === "related" ? "" : "pt-2"}>
        <p className="line-clamp-2 text-text-primary">{item.snippet.title}</p>
        <div className="pt-1 text-text-base text-sm">
          <p>{item.snippet.channelTitle}</p>
          <p>{formatAgo(item.snippet.publishedAt)}</p>
        </div>
      </div>
    </li>
  );
}