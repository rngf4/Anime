import React, { useState, useEffect } from "react";
import { Link, useParams, Routes, Route, useLocation } from "react-router-dom";
import Player from "../components/Player";

function EpisodePlayer({ episodes, setCurrentEpisode }) {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState();
  useEffect(() => {
    const id = episodeId || episodes[0].id || null;
    if (id) {
      fetch(`https://api.consumet.org/anime/gogoanime/watch/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setEpisode(data);
        });
    }
  }, [episodeId, episodes]);

  setCurrentEpisode(episodeId);

  const episodeUrl = episode?.sources.slice(-1)[0].url;
  return <div>{episode ? <Player source={episodeUrl} /> : <>loading</>}</div>;
}

function Details({ content }) {
  return (
    <>
      {content ? (
        <>
          <img
            src={content.image}
            alt={content.title}
            style={{ maxWidth: "400px" }}
          />
          <div>{content.title}</div>
          <div>{content.description}</div>
        </>
      ) : null}
  </>
  );
}

function Episodes({ episodes }) {
  return (
    <>
      {episodes?.map((episode) => {
        return (
          <Link key={episode.id} to={`watch/${episode.id}`}>
            {episode.number}
          </Link>
        );
      })}
    </>
  );
}

export default function AnimePlayer() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(content?.episodes[0].id);

  const tabs = [
    { name: "details", href: "details" },
    {
      name: "episodes",
      href: "episodes",
    },
    {
      name: "player",
      href: `episodes/watch/${currentEpisode}`,
    },
  ];

  useEffect(() => {
    fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentEpisode(data?.episodes[0].id);
        setContent(data);
      });
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        {tabs.map((tab) => {
          return (
            <Link to={tab.href} key={tab.name}>
              {tab.name}
            </Link>
          );
        })}
      </div>
      <Routes>
        <Route index element={<Details content={content} />} />
        <Route path="details" element={<Details content={content} />} />
        <Route path="episodes">
          <Route index element={<Episodes episodes={content?.episodes} />} />
          <Route
            path="watch/:episodeId"
            element={
              <EpisodePlayer
                episodes={content?.episodes}
                setCurrentEpisode={setCurrentEpisode}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
