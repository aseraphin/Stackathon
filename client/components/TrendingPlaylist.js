import React, { Component } from "react";
import { connect } from "react-redux";
import Listbox from "./Listbox";
import Detail from "./Detail";
import Login from "./Login";
import {
  setAuthCode,
  setToken,
  setUser,
  setGenres,
  setPlaylists,
  setTracks,
  setTrending,
} from "../store";
import { Grid } from "@material-ui/core";
import NavBar from "./Navbar";
import { spotifyTrending } from "./YoutubePlayer.js";
import App from "../App";
import { Typography } from "@material-ui/core";

export class TrendingPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenre: "",
      selectedPlaylist: "",
      selectedTrack: "",
      token: this.props.token,
    };
  }

  async componentDidMount() {
    if (this.props.token) return;
    try {
      await this.props.setAuthCode();
      if (this.props.authCode) {
        await this.props.setToken(this.props.authCode);
        await this.props.setUser(this.props.token);
        await this.props.setTrending(spotifyTrending);
      }
    } catch (error) {
      console.log(error);
    }
  }

  trackClicked = (value) => {
    console.log(value.length);
    const currentTracks = [...this.props.trending];

    if (value.length > 20) {
      const firstFilter = currentTracks.filter((t) => "track" in t);
      const trackInfo = firstFilter.filter((t) => t.track.id === value);
      console.log("SPOTIFY TRACK", trackInfo);
      this.setState({ selectedTrack: trackInfo[0].track });
    } else {
      const firstFilter = currentTracks.filter((t) => "embedId" in t);
      const trackInfo = firstFilter.filter((t) => t.embedId === value);
      console.log("YOUTUBE TRACK", trackInfo);
      this.setState({ selectedTrack: trackInfo[0] });
    }
  };

  render() {
    const { trackClicked } = this;
    const { selectedTrack } = this.state;
    const { token, trending } = this.props;
    return (
      <div className="App">
        <NavBar />
        {token ? (
          <div>
            <div className="row">
              <Typography variant="h6" align="left">
                Saved Music
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                {trending && (
                  <Listbox items={trending} clicked={trackClicked} />
                )}
                {selectedTrack && (
                  <Detail
                    tracks={trending}
                    selectedTrack={selectedTrack}
                    token={token}
                  />
                )}
              </Grid>
              <br></br>
              <br></br>
              <br></br>
              <Typography variant="h6" align="left">
                Discover
              </Typography>
              <App />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  authCode,
  token,
  user,
  genres,
  playlists,
  tracks,
  trending,
}) => ({
  authCode,
  token,
  user,
  genres,
  playlists,
  trending,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthCode: () => dispatch(setAuthCode()),
  setToken: (authCode) => dispatch(setToken(authCode)),
  setUser: (token) => dispatch(setUser(token)),
  setGenres: (token) => dispatch(setGenres(token)),
  setPlaylists: (token, selectedGenre) =>
    dispatch(setPlaylists(token, selectedGenre)),
  setTracks: (token, selectedPlaylist) =>
    dispatch(setTracks(token, selectedPlaylist)),
  setTrending: (playlist) => dispatch(setTrending(playlist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPlaylist);
