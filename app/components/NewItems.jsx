// components/Favorites.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch user's favorite articles when the component mounts
    const fetchFavorites = async () => {
      const userId = auth.currentUser?.uid;

      if (userId) {
        const favoritesRef = db
          .collection("users")
          .doc(userId)
          .collection("favorites");

        const snapshot = await favoritesRef.get();
        const favoriteArticles = snapshot.docs.map((doc) => doc.data());
        setFavorites(favoriteArticles);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Favorite Articles</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite articles yet.</p>
      )}
    </div>
  );
};

export default Favorites;
