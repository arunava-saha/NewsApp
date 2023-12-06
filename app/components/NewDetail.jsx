// components/NewsDetail.js

import React from "react";
import Link from "next/link";

const NewsDetail = ({ article }) => {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <p>{article.content}</p>
      <div>
        <Link href={article.url}>
          <a>Read more</a>
        </Link>
      </div>
    </div>
  );
};

export default NewsDetail;
