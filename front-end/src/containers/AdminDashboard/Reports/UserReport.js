import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar }        from '@material-ui/data-grid';
import SideBar                                       from 'components/SideBar';
import React, { useState }                           from 'react';

// Todo: Remove Dummy Data:
const rows: GridRowsProp = [
  { id: Date.now() + 1, userId: '1', userName: 'User-1', userCreated:'2/1/2020' , userType: 'External User', orderId: 'O-11', orderCount:'2' , depositId: 'D-11', depositCount:'3',   status: 'Pending' ,  paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456' },
  { id: Date.now() + 2, userId: '2', userName: 'User-2',userCreated:'2/1/2020' , userType: 'External User', orderId: 'O-11', orderCount:'2' , depositId: 'D-11', depositCount:'3',   status: 'In process' ,  paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456' },
  { id: Date.now() + 3, userId: '3', userName: 'User-3',userCreated:'2/1/2020' , userType: 'External User', orderId: 'O-11', orderCount:'2' , depositId: 'D-11', depositCount:'3',   status: 'Delivered' ,  paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456' },
  { id: Date.now() + 4, userId: '3', userName: 'User-3',userCreated:'2/1/2020' , userType: 'External User', orderId: 'O-11', orderCount:'2' , depositId: 'D-11', depositCount:'3',   status: 'Payment missing' ,  paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456' },
  { id: Date.now() + 5, userId: '1', userName: 'User-1', userCreated:'2/1/2020' , userType: 'External User', orderId: 'O-11', orderCount:'2' , depositId: 'D-11', depositCount:'3',   status: 'Document missing' ,  paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456' }
];

// Todo: Remove Dummy Data:
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 150 }, // UNIQUE ID COLUMN
  { field: 'userId', headerName: 'User Id', width: 150 },
  { field: 'userName', headerName: 'Username', width: 150 },
  { field: 'userCreated', headerName: 'User Created', width: 150 },
  { field: 'userType', headerName: 'User Type', width: 150 },
  { field: 'orderId', headerName: 'Order Id', width: 150 },
  { field: 'orderCount', headerName: 'Order Count', width: 150 },
  { field: 'depositId', headerName: 'deposit Id', width: 150 },
  { field: 'depositCount', headerName: 'Deposit Count', width: 150 },
  { field: 'status', headerName: 'Order Status', width: 150 },
  { field: 'paymentAmount', headerName: 'Payment Amount', width: 150 },
  { field: 'deliveryDate', headerName: 'Delivery Date', width: 150 },
  { field: 'trackingId', headerName: 'Tracking ID', width: 150 },
];

const UserReport = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <SideBar active="Reports">
      <h1>User Details</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <div className="row mt-4">
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="User Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Internal'}>Internal User</MenuItem>
                    <MenuItem value={'External'}>External User</MenuItem>
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">User Created Date</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="User Created"
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
            {/* <div className="row m-3" /> */}
            {/* {/* <div className="row mt-4">
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
                </FormControl> */}
              {/* </div> */}
              {/* <div className="col-6">
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
                </FormControl> */}
              {/* </div>  */}
            {/* </div> */}
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
            <h1 className="label">Report</h1>
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

export default UserReport;
