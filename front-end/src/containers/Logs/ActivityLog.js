import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar }        from '@material-ui/data-grid';
import SideBar                                       from 'components/SideBar';
import React, { useState }                           from 'react';

// Todo: Remove Dummy Data:
const rows: GridRowsProp = [
  { id: Date.now() + 1, userId: '1', userName: 'User-1', date:'1/2/2020', time:'5:45', operation:'Microorganism Added' , table: 'microorganism catalogue' , rowNo:'5'  },
  { id: Date.now() + 2, userId: '2', userName: 'User-2',date:'1/2/2020', time:'5:45', operation:'Microorganism Added' , table: 'microorganism catalogue' , rowNo:'5'  },
  { id: Date.now() + 3, userId: '3', userName: 'User-3', date:'1/2/2020', time:'5:45', operation:'Microorganism Added' , table: 'microorganism catalogue' , rowNo:'5'  },
  { id: Date.now() + 4, userId: '3', userName: 'User-3',date:'1/2/2020', time:'5:45', operation:'Microorganism Added' , table: 'microorganism catalogue' , rowNo:'5'  },
  { id: Date.now() + 5, userId: '1', userName: 'User-1', date:'1/2/2020', time:'5:45', operation:'Microorganism Added' , table: 'microorganism catalogue' , rowNo:'5'  }
];

// Todo: Remove Dummy Data:
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 150 }, // UNIQUE ID COLUMN
  { field: 'userId', headerName: 'User Id', width: 150 },
  { field: 'userName', headerName: 'Username', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'time', headerName: 'Time', width: 150 },
  { field: 'operation', headerName: 'Operation Executed', width: 150 },
  { field: 'Table', headerName: 'Operation Applied on table', width: 150 },
  { field: 'rowNo', headerName: 'Row.no', width: 150 },
];

const ActivityLog = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <SideBar active="Reports">
      <h1>Activity</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <div className="row mt-4">
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">userId</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="User ID"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'U-01'}>01</MenuItem>
                    <MenuItem value={'U-02'}>02</MenuItem>
                    <MenuItem value={'U-03'}>03</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">Date between</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Date Between"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {/*Spacer Added*/}
            <div className="row m-3" />
            <div className="row mt-4">
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="col-4">
            {/*Todo:
              Add Date Dropdown Filter
            */}
          </div>
        </div>
      </div>
      <br /><br /><br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <h1 className="label">Logs</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div style={{ height: 300 }}>
              <DataGrid rows={rows} columns={columns} components={{
          Toolbar: GridToolbar,
        }} />
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default ActivityLog;
