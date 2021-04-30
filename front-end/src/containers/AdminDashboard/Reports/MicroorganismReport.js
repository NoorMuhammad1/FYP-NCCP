import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar }        from '@material-ui/data-grid';
import SideBar                                       from 'components/SideBar';
import React, { useState }                           from 'react';

// Todo: Remove Dummy Data:
const rows: GridRowsProp = [
    { id: Date.now() + 1, microorganismId:'M-01', microNameSpecies:'Philanthopia', microNameGenus:'atlus' , bioHazardLevel:'5', microorganismType:'Fungi', collectionNo:'NCCP-11', dateOfIsolation:'2/01/2021'},
    { id: Date.now() + 1, microorganismId:'M-01', microNameSpecies:'Philanthopia', microNameGenus:'atlus' , bioHazardLevel:'5', microorganismType:'Fungi', collectionNo:'NCCP-11', dateOfIsolation:'2/01/2021'},
];

// Todo: Remove Dummy Data:
const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 150 }, // UNIQUE ID COLUMN
    { field: 'microorganismId', headerName: 'Microorganism Id', width: 150 },
    { field: 'microNameSpecies', headerName: 'Species', width: 150 },
    { field: 'microNameGenus', headerName: 'Genus', width: 150 },
    { field: 'bioHazardLevel', headerName: 'Bio-Hazard Level', width: 150 },
    { field: 'microorganismType', headerName: 'Microorganism Type', width: 150 },
    { field: 'collectionNo', headerName: 'Collection No', width: 150 },
    { field: 'dateOfIsolation', headerName: 'Date of Isolation', width: 150 },
];

const MicroorganismReport = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <SideBar active="Reports">
      <h1>Reports</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
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
            <h1 className="label">Details</h1>
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

export default MicroorganismReport;
