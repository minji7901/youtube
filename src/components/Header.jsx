import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

export default function Header() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      return;
    }
    navigate(`/video/${text}`);
  };

  useEffect(() => {
    setText(keyword || '')
  }, [keyword])
  
  return (
    <header className="flex items-center mb-8">
      <Link to="/" className="flex items-center gap-1">
        <FaYoutube className="text-primary text-3xl" />
        <p className="text-base-100 font-bold text-2xl tracking-tighter">
          YouTube
        </p>
      </Link>
      <form
        className="flex items-center justify-between gap-2 p-2 w-full max-w-[600px] mx-auto border-b border-base-200/50"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="검색"
          className="w-full text-base-100 outline-none bg-transparent placeholder:text-base-200/50"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button className="text-base-200/50">
          <IoIosSearch className="text-2xl" />
        </button>
      </form>
    </header>
  );
}
