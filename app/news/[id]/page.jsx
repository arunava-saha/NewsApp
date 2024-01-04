"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const router = useRouter();
  const pageId = parseInt(params.id, 10) || 1;

  const [isGridView, setIsGridView] = useState(true); // State to track view mode
  const [data, setData] = useState({ articles: [] });

  const fetchData = async (page) => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=4&page=${page}&apikey=${process.env.NEXT_PUBLIC_MyApiKey}`
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
      router.push(`/news/${previousPage}`);
    }
  };
  const handleNext = () => {
    const previousPage = pageId + 1;
    if (data.articles && data.articles.length > 1) {
      router.push(`/news/${previousPage}`);
    }
  };
  let articleId = 4 * (pageId - 1) + 1;
  return (
    <>
      <div className="flex relative justify-end pt-20 p-4">
        <button
          onClick={() => {
            setIsGridView((el) => !el);
            console.log(isGridView);
          }}
          className="px-4 py-2 absolute -bottom-10 right-10 sm:hidden md:block cursor-pointer z-10 bg-gray-500 text-white rounded-lg"
        >
          {isGridView ? "List" : "Grid"}
        </button>
      </div>
      <div className="text-base flex w-full justify-center flex-wrap text-blue-300">
        {data.articles.map((item, i) => (
          <div
            key={i}
            className={` flex relative justify-center items-center bg-slate-950 ${
              isGridView ? "w-[50%]" : "w-full h-full"
            }  gap-4 flex-wrap `}
          >
            <div className="p-8 bg-slate-200">
              <div
                className={`max-w-sm bg-black ${
                  isGridView ? "h-[30rem]" : "w-full h-full"
                } rounded overflow-hidden shadow-lg`}
              >
                <img className="w-full" src={item.urlToImage} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p
                    className={`${
                      isGridView ? "hidden" : "block"
                    } text-gray-100 text-base`}
                  >
                    {item.description}
                  </p>
                  <div className="flex justify-between">
                    <button className="font-bold items-end w-full text-xl mb-2">
                      <Link href={`/article/${i + articleId}`}>Read more</Link>
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

export default Page;
