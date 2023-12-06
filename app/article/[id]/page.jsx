"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const router = useRouter();
  const pageId = parseInt(params.id, 10) || 1;
  const [data, setData] = useState({ articles: [] });

  const fetchData = async (page) => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=1&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MyApiKey}`,
          },
        }
      );
      const result = await res.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log(data);
    fetchData(pageId);
  }, [pageId]);

  const handlePrevious = () => {
    const previousPage = pageId - 1;
    if (data.articles && data.articles.length > 0) {
      router.push(`/article/${previousPage}`);
    }
  };
  const handleNext = () => {
    const nextPage = pageId + 1;
    if (data.articles && data.articles.length > 0) {
      router.push(`/article/${nextPage}`);
    }
  };
  return (
    <>
      <div className="flex relative justify-end pt-20 p-4"></div>
      <div className="text-base flex w-full justify-center flex-wrap text-blue-300">
        {data.articles.map((item, i) => (
          <div
            key={i}
            className={` flex relative justify-center items-center bg-slate-950 gap-4 flex-wrap `}
          >
            <div className="p-8 bg-slate-200">
              <div className={`bg-black rounded overflow-hidden shadow-lg`}>
                <div className="font-bold text-4xl p-10 mb-2">{item.title}</div>
                <div className="flex">
                  <div className="font-bold text-lg p-10 mb-2">
                    {item.author}
                  </div>

                  <div className="font-bold text-lg p-10 mb-2">
                    {item.publishedAt}
                  </div>
                </div>
                <img className="w-full" src={item.urlToImage} />
                <div className="px-6 py-4">
                  <p className={`text-gray-100 text-base`}>
                    {item.description}
                  </p>
                  <p className={`text-gray-100 text-base`}>{item.content}</p>
                  <p className={`text-gray-100 text-base`}>
                    {item.source.name}
                  </p>
                  <div className="flex justify-between">
                    <button className="font-bold items-end w-full text-xl mb-2">
                      <Link href={item.url}>Read more on the website</Link>
                    </button>
                    <button className="font-bold items-end w-full text-xl mb-2">
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-16 mt-28">
        <div
          onClick={handlePrevious}
          className="px-4 py-2 cursor-pointer bg-slate-500 rounded-lg"
        >
          previous
        </div>
        <div className="border border-green-400 px-4 py-2">{pageId}</div>
        <div
          onClick={handleNext}
          className="px-4 py-2 bg-slate-500 cursor-pointer rounded-lg"
        >
          next
        </div>
      </div>
    </>
  );
};

export default page;
