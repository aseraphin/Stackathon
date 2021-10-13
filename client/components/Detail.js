import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { Grid } from "@material-ui/core";
import YoutubePlayer from "./YoutubePlayer";
import { Typography } from "@material-ui/core";

const Detail = ({ selectedTrack, token, tracks }) => {
  return (
    <div className="content">
      <br></br>
      <Typography gutterBottom="true" variant="h4" align="left">
        {" "}
      </Typography>
      {"uri" in selectedTrack ? (
        <div className="offset-md-1 col-sm-4">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <div className="row col-sm-12 px-0">
              <img
                src={selectedTrack.album.images[0].url}
                alt={selectedTrack.name}
              ></img>
            </div>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <div className="row col-sm-12 px-0">
                <label
                  htmlFor={selectedTrack.name}
                  className="form-label col-sm-12"
                >
                  {selectedTrack.name}
                </label>
              </div>
              <div className="row col-sm-12 px-0">
                <label
                  htmlFor={selectedTrack.artists[0].name}
                  className="form-label col-sm-12"
                >
                  {selectedTrack.artists[0].name}
                </label>
              </div>
            </Grid>
          </Grid>
          <SpotifyPlayer uris={[selectedTrack.uri]} token={token} />
          {/* <SpotifyPlayer uris={tracks.map((t) => t.track.uri)} token={token} /> */}
        </div>
      ) : (
        <YoutubePlayer embedId={selectedTrack.embedId} />
      )}
    </div>
  );
};

export default Detail;
