import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState }                           from 'react';
import './style.css';

const DropDown = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <FormControl
      variant={props.variant}
      style={{ width: props.width, margin: '0rem 0rem 0rem 1rem' }}
    >
      <InputLabel id="demo-controlled-open-select-label">
        {props.title}
      </InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={(e) => setOpen(false)}
        onOpen={(e) => setOpen(true)}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        labelWidth={props.labelWidth}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.data &&
        props.data.map((item, key) => {
          return (
            <MenuItem value={item.value} key={key}>
              {item.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DropDown;
