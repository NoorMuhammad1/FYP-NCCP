import React from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
const SearchBar = (props) => {
  return (
    <FormControl variant="outlined" style={{ width: "50%" }}>
      <InputLabel htmlFor="outlined-adornment-search-bar">Search</InputLabel>
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
        labelWidth={50}
      />
    </FormControl>
  );
};

export default SearchBar;
