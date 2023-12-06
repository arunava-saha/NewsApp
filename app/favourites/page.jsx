"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner.jsx";
import Favorites from "../components/NewItems";

const page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="py-20 text-center text-white">
      {loading ? (
        <Spinner />
      ) : user ? (
        <>
          <p className="">
            Welcome, {user.displayName} - you are logged in to your favourites
            page - a protected route.
          </p>
          <Favorites />
        </>
      ) : (
        <p className="">
          You must be logged in to view this page - protected route.
        </p>
      )}
    </div>
  );
};

export default page;
