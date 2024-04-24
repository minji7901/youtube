import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Main() {
  const { keyword } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () =>
      axios
        .get(`/data/${keyword ? "result" : "popular"}.json`)
        .then((res) => res.data.items),
  });
  return (
    <div>
      {isLoading && "loading"}
      {error && `'error ' ${error.message}`}
      {data &&
        data.map((item) => <div key={item.id}>{item.snippet.title}</div>)}
    </div>
  );
}
