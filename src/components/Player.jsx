import React from "react";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import "./Plyr.css";

// quality https://codepen.io/karnith/pen/MWoyaGR

export default function Player({ source }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported()) {
      new window.Plyr(video);
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else {
      video.src = source;
    }
  }, [source]);

  return (
    <video
      id="player"
      preload="none"
      controls
      autoPlay
      ref={videoRef}
      muted
    ></video>
  );
}
