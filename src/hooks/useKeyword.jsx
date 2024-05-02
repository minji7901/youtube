import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDataFromResult = async (keyword) => {
  const  {data} = await axios
  .get('/data/result.json')
  .then((res) => res.data.items)
  return data;
}
const fetchDataFromPopular = async () => {
  const  {data} = await axios
  .get('/data/popular.json')
  .then((res) => res.data.items)
  return data;
}

export function useKeywordData(keyword) {
  if (keyword) {
    const response = axios.get("/data/result.json").then((res) => res.data.items);
  } else {
    const response = axios.get("/data/popular.json").then((res) => res.data.items);
  }
  return <div></div>;
}
