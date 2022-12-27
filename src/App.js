import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import Anime from "./pages/Anime";
import AnimePlayer from "./pages/AnimePlayer";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/">
          <Route index element={<Root />} />
          <Route path="anime" element={<Anime />} />
          <Route path="anime/:id" element={<AnimePlayer />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
