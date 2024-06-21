import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useYoutube from "../hooks/useYoutube";
import Video from "../components/Video";

export default function Main() {
  const { keyword } = useParams();
  const youtube = useYoutube();
  const { isLoading, error, data } = useQuery({
    queryKey: keyword ? ['search', keyword] : ['popular'],
    queryFn: () => youtube.searchVideo(keyword),
    staleTime: 1000 * 60 * 1
  });

  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {isLoading && <li>loading</li>}
      {error && <li>error: {error.message}</li>}
      {data && data.map((item) =>
        <Video key={item.id} item={item} />
      )}
    </ul>
  );
}
