import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "./components/Dropdown";
import Listbox from "./components/Listbox";
import Detail from "./components/Detail";
import Login from "./components/Login";
import {
  setAuthCode,
  setToken,
  setUser,
  setGenres,
  setPlaylists,
  setTracks,
} from "./store";
import YoutubePlayer from "./components/YoutubePlayer.js";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import NavBar from "./components/Navbar";

export class App extends Component {
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
    try {
      await this.props.setGenres(this.props.token);
    } catch (error) {
      await this.props.setAuthCode();
      if (this.props.authCode) {
        await this.props.setUser(this.props.token);
        await this.props.setToken(this.props.authCode);
        await this.props.setUser(this.props.token);
        await this.props.setGenres(this.props.token);
        console.log(error);
      }
    }
  }

  genreChanged = (selectedGenre) => {
    this.setState({ selectedGenre });
    this.props.setPlaylists(this.props.token, selectedGenre);
  };

  playlistChanged = (selectedPlaylist) => this.setState({ selectedPlaylist });

  searchClicked = (evt) => {
    evt.preventDefault();
    this.props.setTracks(this.props.token, this.state.selectedPlaylist);
  };

  trackClicked = (value) => {
    const currentTracks = [...this.props.tracks];
    const trackInfo = currentTracks.filter((t) => t.track.id === value);
    this.setState({ selectedTrack: trackInfo[0].track });
  };

  render() {
    const { genreChanged, playlistChanged, searchClicked, trackClicked } = this;
    const { selectedGenre, selectedPlaylist, selectedTrack } = this.state;
    const { token, genres, playlists, tracks } = this.props;

    return (
      <div className="App">
        {token ? (
          <div>
            {/* <NavBar /> */}

            <form onSubmit={searchClicked}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Dropdown
                  label="Genre :"
                  options={genres}
                  selectedValue={selectedGenre}
                  changed={genreChanged}
                />
                <Dropdown
                  label="Playlist :"
                  options={playlists}
                  selectedValue={selectedPlaylist}
                  changed={playlistChanged}
                />
                <div className="col-sm-6 row form-group px-0">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="btn btn-success col-sm-12"
                    disableElevation
                  >
                    Search
                  </Button>
                </div>
              </Grid>
              <div className="row">
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Listbox items={tracks} clicked={trackClicked} />
                  {/* </div> */}
                  {/* <div> */}
                  {selectedTrack && (
                    <Detail
                      tracks={tracks}
                      selectedTrack={selectedTrack}
                      token={token}
                    />
                  )}
                </Grid>
              </div>
            </form>
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
}) => ({
  authCode,
  token,
  user,
  genres,
  playlists,
  tracks,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
