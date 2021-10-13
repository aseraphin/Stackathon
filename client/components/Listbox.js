import React from "react";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
const Listbox = (props) => {
  const clicked = (e) => {
    e.preventDefault();
    props.clicked(e.currentTarget.id);
  };

  return (
    <div className="col-sm-6 px-0">
      <div className="list-group">
        {props.items.map((item, idx) =>
          "track" in item ? (
            <Button
              color="primary"
              key={idx}
              onClick={clicked}
              className="list-group-item list-group-item-action list-group-item-light"
              id={item.track.id}
            >
              {item.track.name}
            </Button>
          ) : (
            <Button
              color="primary"
              key={idx}
              onClick={clicked}
              className="list-group-item list-group-item-action list-group-item-light"
              id={item.id}
            >
              {item.title}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Listbox;
