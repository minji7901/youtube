import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import logo from '../assets/logo.png';

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
    <header className="flex items-center pt-2 pb-4">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} className="w-10" alt="logo"/>
        <span className="text-xl font-bold">OneTube</span>
      </Link>
      <form
        className="flex items-center justify-between gap-2 px-5 py-2 w-full max-w-[600px] mx-auto border border-base rounded-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="검색"
          className="w-full text-base-100 outline-none bg-transparent placeholder:text-text-secondary text-text-primary"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button className="text-secondary">
          <IoIosSearch className="text-2xl" />
        </button>
      </form>
    </header>
  );
}
