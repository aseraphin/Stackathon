import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Dropdown = (props) => {
  const classes = useStyles();

  const dropdownChanged = (e) => {
    props.changed(e.target.value);
  };

  return (
    <div className="col-sm-6 form-group row px-0">
      <FormControl className={classes.formControl}>
        <InputLabel className="form-label col-sm-2">{props.label}</InputLabel>
        <Select
          value={props.selectedValue}
          onChange={dropdownChanged}
          className="form-control form-control-sm col-sm-10"
        >
          <MenuItem key={0}>Select...</MenuItem>
          {props.options.map((item, idx) => (
            <MenuItem key={idx + 1} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
