import axios from "axios";

export default class Handler {
  constructor(config) {
    this.config = config;
  }

  getAnimeSearchLink(query) {
    return this.config.animeSearch.replace("<QUERY>", query);
  }

  async getAnimeSearchData(query) {
    return await axios.get(this.getAnimeSearchLink(query));
  }

  getAnimeEpisodeLink(anime, episode) {
    return this.config.animeEpisode
      .replace("<ANIME_ID>", anime)
      .replace("<EPISODE_ID>", episode);
  }

  async getAnimeEpisodeData(anime, episode) {
    return await (
      await axios.get(this.getAnimeEpisodeLink(anime, episode))
    ).json();
  }
}
