import axios from "axios";
import config from "../config";

//  Api Base url
const apiBaseUrl = "https://api.themoviedb.org/3";

//endpoint
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${config.MOVIE_API_KEY}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${config.MOVIE_API_KEY}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${config.MOVIE_API_KEY}`;

// for search
const searchMovieEndpoint = `${apiBaseUrl}/search/movie?api_key=${config.MOVIE_API_KEY}`;

// dynamicEndpoint
const movieDetailEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${config.MOVIE_API_KEY}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${config.MOVIE_API_KEY}`;
const movieSimilarEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${config.MOVIE_API_KEY}`;

//personEndpoint

const personDetailEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${config.MOVIE_API_KEY}`;

const personMovieEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${config.MOVIE_API_KEY}`;

//image
export const image500 = (path) => `https://image.tmdb.org/t/p/w500${path}`;
export const image342 = (path) => `https://image.tmdb.org/t/p/w342${path}`;
export const image185 = (path) => `https://image.tmdb.org/t/p/w185${path}`;

// fallback image
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const getDataFromApi = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("Error from getDataFromApi", error);
  }
};

export const fetchTrendingMovie = (params) => {
  return getDataFromApi(trendingMoviesEndPoint, params);
};

export const fetchUpcomingMovie = (params) => {
  return getDataFromApi(trendingMoviesEndPoint, params);
};

export const fetchTopRatedMovie = (params) => {
  return getDataFromApi(trendingMoviesEndPoint, params);
};

export const fetchSearchMovie = (params) => {
  return getDataFromApi(searchMovieEndpoint, params);
};

export const fetchMovieDetail = (id) => {
  return getDataFromApi(movieDetailEndpoint(id));
};

export const fetchMovieCredit = (id) => {
  return getDataFromApi(movieCreditsEndpoint(id));
};

export const fetchSimilarMovie = (id) => {
  return getDataFromApi(movieSimilarEndpoint(id));
};

export const fetchPersonDetail = (id) => {
  return getDataFromApi(personDetailEndpoint(id));
};

export const fetchPersonMovie = (id) => {
  return getDataFromApi(personMovieEndpoint(id));
};
