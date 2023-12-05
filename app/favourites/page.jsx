"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner.jsx";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";

const page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  //   const [favourites, favouritesLoding, favouritesError] = useCollection(
  //     firestore.firestore().collection("favourites"),
  //     {}
  //   );
  //   if (!favouritesLoding && favourites) {
  //     favourites.docs.map((doc) => console.log(doc.data()));
  //   }

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
        <p className="">
          Welcome, {user.displayName} - you are logged in to your favourites
          page - a protected route.
        </p>
      ) : (
        <p className="">
          You must be logged in to view this page - protected route.
        </p>
      )}
    </div>
  );
};

export default page;
