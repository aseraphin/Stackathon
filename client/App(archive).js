// import React, { useState, useEffect } from "react";
// import Dropdown from "./components/Dropdown";
// import Routes from "./Routes";
// import Listbox from "./components/Listbox";
// import Detail from "./components/Detail";
// import { Credentials } from "./components/Credentials";
// import axios from "axios";
// import Login from "./components/Login";

// const App = () => {
//   const credentials = Credentials();

//   const [token, setToken] = useState("");
//   const [user, setUser] = useState({});
//   const [discoverWeekly, setDiscoverWeekly] = useState([]);
//   const [genres, setGenres] = useState({
//     selectedGenre: "",
//     listOfGenresFromAPI: [],
//   });
//   const [playlist, setPlaylist] = useState({
//     selectedPlaylist: "",
//     listOfPlaylistFromAPI: [],
//   });
//   const [tracks, setTracks] = useState({
//     selectedTrack: "",
//     listOfTracksFromAPI: [],
//   });
//   const [trackDetail, setTrackDetail] = useState(null);

//   useEffect(() => {
//     axios("https://accounts.spotify.com/api/token", {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization:
//           "Basic " +
//           btoa(credentials.ClientId + ":" + credentials.ClientSecret),
//       },
//       data: "grant_type=client_credentials",
//       method: "POST",
//     }).then((tokenResponse) => {
//       setToken(tokenResponse.data.access_token);
//       axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
//         method: "GET",
//         headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
//       }).then((genreResponse) => {
//         setGenres({
//           selectedGenre: genres.selectedGenre,
//           listOfGenresFromAPI: genreResponse.data.categories.items,
//         });
//       });
//       axios("https://api.spotify.com/v1/me", {
//         method: "GET",
//         headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
//       }).then((userResponse) => {
//         setUser({ user: userResponse });
//       });
//     });
//   }, [genres.selectedGenre, credentials.ClientId, credentials.ClientSecret]);

//   const genreChanged = (val) => {
//     setGenres({
//       selectedGenre: val,
//       listOfGenresFromAPI: genres.listOfGenresFromAPI,
//     });

//     axios(
//       `https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`,
//       {
//         method: "GET",
//         headers: { Authorization: "Bearer " + token },
//       }
//     ).then((playlistResponse) => {
//       setPlaylist({
//         selectedPlaylist: playlist.selectedPlaylist,
//         listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
//       });
//     });

//     console.log(val);
//   };

//   const playlistChanged = (val) => {
//     console.log(val);
//     setPlaylist({
//       selectedPlaylist: val,
//       listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI,
//     });
//   };

//   const buttonClicked = (e) => {
//     e.preventDefault();

//     axios(
//       `https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=20`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }
//     ).then((tracksResponse) => {
//       setTracks({
//         selectedTrack: tracks.selectedTrack,
//         listOfTracksFromAPI: tracksResponse.data.items,
//       });
//     });
//   };

//   const listboxClicked = (val) => {
//     const currentTracks = [...tracks.listOfTracksFromAPI];

//     const trackInfo = currentTracks.filter((t) => t.track.id === val);

//     setTrackDetail(trackInfo[0].track);
//   };

//   return (
//     <div>
//       {token ? (
//         <div className="container">
//           <form onSubmit={buttonClicked}>
//             <Dropdown
//               label="Genre :"
//               options={genres.listOfGenresFromAPI}
//               selectedValue={genres.selectedGenre}
//               changed={genreChanged}
//             />
//             <Dropdown
//               label="Playlist :"
//               options={playlist.listOfPlaylistFromAPI}
//               selectedValue={playlist.selectedPlaylist}
//               changed={playlistChanged}
//             />
//             <div className="col-sm-6 row form-group px-0">
//               <button type="submit" className="btn btn-success col-sm-12">
//                 Search
//               </button>
//             </div>
//             <div className="row">
//               <Listbox
//                 items={tracks.listOfTracksFromAPI}
//                 clicked={listboxClicked}
//               />
//               {trackDetail && <Detail {...trackDetail} />}
//             </div>
//           </form>
//         </div>
//       ) : (
//         <Login />
//       )}
//     </div>
//   );
// };

// export default App;
