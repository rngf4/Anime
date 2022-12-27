import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Player from "../components/Player";

function EpisodePlayer({ episodeId, episodes }) {
  const [episode, setEpisode] = useState();
  useEffect(() => {
    const id = episodeId || episodes[0].id || null;
    if (episodeId) {
      fetch(`https://api.consumet.org/anime/gogoanime/watch/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setEpisode(data);
        });
    }
  }, [episodeId, episodes]);
  const episodeUrl = episode?.sources.slice(-1)[0].url;
  return <>{episode ? <Player source={episodeUrl} /> : <>loading</>}</>;
}
function Details({ content }) {
  return (
    <>
      {content ? (
        <>
          <img src={content.image} alt={content.title} />
          <div>{content.title}</div>
          <div>{content.description}</div>
        </>
      ) : null}
    </>
  );
}

function Episodes({ episodes, setTab }) {
  return (
    <>
      {episodes?.map((episode) => {
        return (
          <button
            onClick={() => {
              setTab(<EpisodePlayer episodeId={episode.id} />);
            }}
            key={episode.id}
          >
            {episode.number}
          </button>
        );
      })}
    </>
  );
}

export default function AnimePlayer() {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  const [tab, setTab] = useState(<Details content={content} />);

  const tabs = [
    { name: "details", component: <Details content={content} /> },
    {
      name: "episodes",
      component: <Episodes episodes={content?.episodes} setTab={setTab} />,
    },
    {
      name: "player",
      component: <EpisodePlayer episodes={content?.episodes} />,
    },
  ];

  useEffect(() => {
    fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
      });
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        {tabs.map((tab) => {
          return (
            <button onClick={() => setTab(tab.component)} key={tab.name}>
              {tab.name}
            </button>
          );
        })}
      </div>
      <div>{tab}</div>
    </div>
  );
}
