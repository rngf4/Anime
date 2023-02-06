import React, { useEffect, useState, useRef, useCallback } from "react";
import PageHook from "../components/PageHook";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import WebsiteHandler from "../websites";

function AnimeCard({ id, image, title }) {
  return (
    <Link to={`/anime/${id}`}>
      <img src={image} alt={id} />
      {title}
    </Link>
  );
}

export default function Search() {
  const [inputQuery, setInputQuery] = useState("");
  const [query, setQuery] = useState(inputQuery);
  const [results, setResults] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query) {
      fetch(`https://api.consumet.org/anime/gogoanime/${inputQuery}`)
        .then((res) => res.json())
        .then((data) => {
          const changeTo = results;
          changeTo.push(...data.results);
          setResults(changeTo);
          setHasNextPage(data.hasNextPage);
          setCurrentPage(data.currentPage);
        });
    } else {
      fetch(
        `https://api.consumet.org/anime/gogoanime/top-airing?page=${
          parseInt(currentPage) + 1
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          const changeTo = results;
          changeTo.push(...data.results);
          setResults(changeTo);
          setHasNextPage(data.hasNextPage);
          setCurrentPage(data.currentPage);
        });
    }

    // eslint-disable-next-line
  }, [inputQuery]);

  function handleQueryChange(e) {
    setCurrentPage(1);
    setResults([]);
    setQuery(e.target.value);
    setInputQuery(e.target.value);
  }

  function loadNextPage() {
    setHasNextPage(false);
    setInputQuery(`${query}?page=${parseInt(currentPage) + 1}`);
  }
  //grid-template-columns: repeat(4, minmax(0, 1fr)
  return (
    <PageHook>
      <div className="w-full flex flex-col items-center">
        <input className="w-full text-black" onChange={handleQueryChange} />
        <div className="w-full">
          <InfiniteScroll
            dataLength={results.length}
            next={loadNextPage}
            hasMore={hasNextPage}
            loader={<h4>loading</h4>}
          >
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((result) => (
                <AnimeCard {...result} key={result.id} />
              ))}
            </div>
          </InfiniteScroll>

          {/*hasNextPage ? (
            <button onClick={loadNextPage}>load more</button>
          ) : null*/}
        </div>
      </div>
    </PageHook>
  );
}
