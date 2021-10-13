import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import axios from "axios";
import { Credentials } from "../components/Credentials";
import history from "../history";
const queryString = require("query-string");

//The redirectUri is the one which we gave in the Spotify Web API settings,
//this states where to take back the user if the Spotify login was successful.
const redirectUri = "https://musicmecca.herokuapp.com/";

//the Client ID providedby the Spotify Web API when registering app
const credentials = Credentials();

//constants
const SET_AUTH_CODE = "SET_AUTH_CODE";
const SET_TOKEN = "SET_TOKEN";
const SET_USER = "SET_USER";
const SET_PLAYLISTS = "SET_PLAYLISTS";
const SET_TRENDING = "SET_TRENDING";
const SET_GENRES = "SET_GENRES";
const SET_TRACKS = "SET_TRACKS";

//action creators
const _setAuthCode = (code) => ({
  type: SET_AUTH_CODE,
  code,
});
const _setUser = (user) => ({
  type: SET_USER,
  user,
});
const _setToken = (token) => ({
  type: SET_TOKEN,
  token,
});
const _setPlaylists = (playlists) => ({
  type: SET_PLAYLISTS,
  playlists,
});

const _setTracks = (tracks) => ({
  type: SET_TRACKS,
  tracks,
});
const _setGenres = (genres) => ({
  type: SET_GENRES,
  genres,
});
const _setTrending = (trending) => ({
  type: SET_TRENDING,
  trending,
});

const initialState = {
  authCode: null,
  user: null,
  token: null,
  playlists: [],
  playing: false,
  item: null,
  genres: [],
  tracks: [],
  trending: [],
};

//reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CODE:
      return {
        ...state,
        authCode: action.code,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
      };
    case SET_GENRES:
      return {
        ...state,
        genres: action.genres,
      };
    case SET_TRENDING:
      return {
        ...state,
        trending: action.trending,
      };
    default:
      return state;
  }
};

//thunks / effects
export const setAuthCode = () => {
  return async (dispatch) => {
    let params = new URLSearchParams(window.location.search);
    let authCode = params.get("code");
    if (authCode) dispatch(_setAuthCode(authCode));
    history.push("/");
  };
};

export const setToken = (authCode) => {
  return async (dispatch) => {
    const { data } = await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      data: queryString.stringify({
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: "https://musicmecca.herokuapp.com/",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(credentials.ClientId + ":" + credentials.ClientSecret),
      },
    });
    dispatch(_setToken(data.access_token));
  };
};

export const setUser = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch(_setUser(data));
  };
};

export const setGenres = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/browse/categories?locale=sv_US",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    dispatch(_setGenres(data.categories.items));
  };
};

export const setPlaylists = (token, selectedGenre) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${selectedGenre}/playlists?limit=10`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    dispatch(_setPlaylists(data.playlists.items));
  };
};

export const setTracks = (token, selectedPlaylist) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks?limit=20`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    dispatch(_setTracks(data.items));
  };
};

export const setTrending = (data) => {
  return async (dispatch) => {
    dispatch(_setTrending(data));
  };
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
