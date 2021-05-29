import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const SearchBar = (props) => {
  return (
    //style={{ width: "50%" }}
    <FormControl
      margin={props.margin}
      style={{ width: props.width }}
      variant="outlined"
    >
      {/* <InputLabel htmlFor="outlined-adornment-search-bar">Search</InputLabel> */}
      <OutlinedInput
        id="outlined-adornment-search-bar"
        name="search-bar"
        placeholder="Search"
        type="text"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <IconButton edge="start">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={0}
      />
    </FormControl>
  );
};

export default SearchBar;
