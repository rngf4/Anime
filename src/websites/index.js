import gogoanime from "./gogoanime";
import animepahe from "./animepahe";

const websiteHandlers = [gogoanime, animepahe];

export default class WebsiteHandler {
  static async getAnimeSearch(query) {
    const searchPromises = websiteHandlers.map((websiteHandler) => {
      return websiteHandler.getAnimeSearchData(query);
    });

    const settledResults = await Promise.allSettled(searchPromises);

    const settledData = settledResults.map((result) => {
      return result.value.data;
    });

    return settledData;
  }
}
