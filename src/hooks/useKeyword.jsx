import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function useKeyword() {
  const { keyword } = useParams();
  if (keyword) {
    axios.get("/data/result.json").then((res) => res.data.items);
  } else {
    axios.get("/data/popular.json").then((res) => res.data.items);
  }
  return <div></div>;
}
