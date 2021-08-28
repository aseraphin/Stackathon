import { Credentials } from "./client/components/Credentials";
const queryString = require("query-string");

//authEndpoint: URL where we need to authenticate using Spotify.
//All Spotify Authentication requests must be passed through this URL.
export const authEndpoint = "https://accounts.spotify.com/authorize";

//The redirectUri is the one which we gave in the Spotify Web API settings,
//this states where to take back the user if the Spotify login was successful.
const redirectUri = "http://localhost:8080/";

//the Client ID providedby the Spotify Web API when registering app
const credentials = Credentials();

//Permissions which you need to ask Spotify for.
const scopes = [
  "streaming",
  "user-library-read",
  "user-library-modify",
  "user-read-currently-playing",
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

//Final URL which needs to be called to authorize a user for our app.
//Contains the Client ID and all the permissions so that Spotify knows
//about our app and allows user authentication.
export const loginUrl = `${authEndpoint}?client_id=${
  credentials.ClientId
}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=code&show_dialog=true`;
