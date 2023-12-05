"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Redressed } from "next/font/google";
import { UserAuth } from "../context/AuthContext";
const red = Redressed({ subsets: ["latin"], weight: ["400"] });

export const NavBar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  console.log(user);
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return (
    <>
      <div className="w-full py-3 flex gap-8 z-50 border border-b-4 justify-center text-lg bg-slate-600 fixed">
        <Link
          href="/"
          className={`text-gray-950 text-base w-8 h-8 relative bg-slate-200 mx-5 p-2 rounded-full ${red.className}`}
        >
          <span className="text-green-500 uppercase absolute -top-1 text-lg">
            news
          </span>
          App
        </Link>
        <div className="w-full py-3 flex gap-8 justify-center">
          {!user ? null : (
            <p className="hover:text-slate-300">
              <Link href="/favourites">Favourites</Link>
            </p>
          )}
          <Link className="hover:text-slate-300" href="/news/1">
            News
          </Link>
          <Link className="hover:text-slate-300" href="/auth">
            Login/Register
          </Link>
          <Link className="hover:text-slate-300" href="https://newsapi.org/">
            Get your News API
          </Link>
        </div>
        {loading ? null : !user ? (
          <ul className="flex mr-10 items-center text-center">
            <li onClick={handleSignIn} className="p-2 text-base cursor-pointer">
              Login
            </li>
            <li onClick={handleSignIn} className="p-2 text-base cursor-pointer">
              SignUp
            </li>
          </ul>
        ) : (
          <div className="flex items-center justify-center px-4 gap-5">
            <img
              className="w-9 h-9 rounded-full border border-green-700 pb-2"
              src={user.photoURL}
              alt=""
            />
            <p
              className="cursor-pointer mr-4 text-base"
              onClick={handleSignOut}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </>
  );
};
