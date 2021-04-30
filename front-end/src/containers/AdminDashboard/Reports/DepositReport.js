import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar }        from '@material-ui/data-grid';
import SideBar                                       from 'components/SideBar';
import React, { useState }                           from 'react';

// Todo: Remove Dummy Data:
const rows: GridRowsProp = [
  { id: Date.now() + 1, userId: '1', userName: 'User-1', orderId: '019', status: 'Pending' , date: '01/03/2020', destination: 'karachi', paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456'},
  { id: Date.now() + 2, userId: '2', userName: 'User-2', orderId: '017', status: 'In Process' ,  date: '01/03/2020', destination: 'karachi', paymentAmount: '4400' , deliveryDate: '06/03/2020' , trackingId:'0123456'},
  { id: Date.now() + 3, userId: '3', userName: 'User-3', orderId: '015', status: 'Delivered',  date: '01/03/2020', destination: 'Islamabad', paymentAmount: '3900' , deliveryDate: '06/03/2020' , trackingId:'0123456'},
  { id: Date.now() + 4, userId: '3', userName: 'User-3', orderId: '014', status: 'Pending' ,  date: '01/03/2020', destination: 'karachi', paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456'},
  { id: Date.now() + 5, userId: '1', userName: 'User-1', orderId: '012', status: 'Return' ,  date: '01/03/2020', destination: 'Rawalpindi', paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456'},

  { id: Date.now() + 6, userId: '5', userName: 'Niha', orderId: '012', status: 'Delivered' ,  date: '01/03/2020', destination: 'karachi', paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456'},
  { id: Date.now() + 7, userId: '6', userName: 'Noor', orderId: '013', status: 'In process' ,  date: '05/04/2020', destination: 'Lahore', paymentAmount: '3800' , deliveryDate: '09/04/2020' , trackingId:'0123456'},
  { id: Date.now() + 8, userId: '9', userName: 'Khizer', orderId: '014', status: 'Delivered' ,  date: '01/06/2020', destination: 'karachi', paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456'},
  { id: Date.now() + 9, userId: '7', userName: 'Ali', orderId: '015', status: 'Return' ,  date: '10/03/2020', destination: 'karachi', paymentAmount: '3000' , deliveryDate: '06/03/2020' , trackingId:'0123456' },
  { id: Date.now() + 10, userId: '8', userName: 'Asna', orderId: '017', status: 'Return' ,  date: '08/05/2020', destination: 'karachi', paymentAmount: '3400' , deliveryDate: '06/03/2020' , trackingId:'0123456'} 

];

// Todo: Remove Dummy Data:
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 150 }, // UNIQUE ID COLUMN
  { field: 'userId', headerName: 'User Id', width: 150 },
  { field: 'userName', headerName: 'Username', width: 150 },
  { field: 'orderId', headerName: 'Order Id', width: 150 },
  { field: 'status', headerName: 'Order Status', width: 150 },
  { field: 'date', headerName: 'Order Date', width: 150 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'paymentAmount', headerName: 'Payment Amount', width: 150 },
  { field: 'deliveryDate', headerName: 'Delivery Date', width: 150 },
  { field: 'trackingId', headerName: 'Tracking ID', width: 150 },
];

const OrderReport = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <SideBar active="Reports">
      <h1>Deposit Details</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <div className="row mt-4">
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Delivered'}>Delivered</MenuItem>
                    <MenuItem value={'Pending Request'}>Pending Request</MenuItem>
                    <MenuItem value={'Processing'}>Processing</MenuItem>
                    <MenuItem value={'Payment missing'}>Payment missing</MenuItem>
                    <MenuItem value={'Document missing'}>Document missing</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">Deposit Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Deposit Type"
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
                  <InputLabel id="demo-simple-select-outlined-label">Date Between</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Date"
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
                  <InputLabel id="demo-simple-select-outlined-label">Deposit ID</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Deposit ID"
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

export default OrderReport;
