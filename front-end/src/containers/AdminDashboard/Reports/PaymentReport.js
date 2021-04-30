import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar }        from '@material-ui/data-grid';
import SideBar                                       from 'components/SideBar';
import React, { useState }                           from 'react';

// Todo: Remove Dummy Data:
const rows: GridRowsProp = [
  { id: Date.now() + 1, userId: '1', userName: 'User-1',  status: 'Pending', orderId: 'O-1', depositId: 'D-01' , subAmount:'3000', shippingCharges:'300', total:'3300'  },
  { id: Date.now() + 2, userId: '2', userName: 'User-2',  status: 'In Process' , orderId: 'O-1', depositId: 'D-01' , subAmount:'3000', shippingCharges:'300', total:'3300'  },
  { id: Date.now() + 3, userId: '3', userName: 'User-3', status: 'Done', orderId: 'O-1', depositId: 'D-01' , subAmount:'3000', shippingCharges:'300', total:'3300' },
  { id: Date.now() + 4, userId: '3', userName: 'User-3',  status: 'Pending' , orderId: 'O-1', depositId: 'D-01' , subAmount:'3000', shippingCharges:'300', total:'3300' },
  { id: Date.now() + 5, userId: '1', userName: 'User-1', status: 'Return' , orderId: 'O-1', depositId: 'D-01' , subAmount:'3000', shippingCharges:'300', total:'3300'  }
];

// Todo: Remove Dummy Data:
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 150 }, // UNIQUE ID COLUMN
  { field: 'userId', headerName: 'User Id', width: 150 },
  { field: 'userName', headerName: 'Username', width: 150 },
  { field: 'status', headerName: 'Order Status', width: 150 },
  { field: 'orderId', headerName: 'Order Id', width: 150 },
  { field: 'depositId', headerName: 'Deposit Id', width: 150 },
  { field: 'subAmount', headerName: 'Sub Amount', width: 150 },
  { field: 'shippingCharges', headerName: 'Shipping Charges', width: 150 },
  { field: 'total', headerName: 'Total', width: 150 },
];

const PaymentReport = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <SideBar active="Reports">
      <h1>Payment Details</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <div className="row mt-4">
              <div className="col-6">
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">Order Payment</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Order payment"
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
                  <InputLabel id="demo-simple-select-outlined-label">Deposit Payment</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Deposit Payment"
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
                  <InputLabel id="demo-simple-select-outlined-label">Date between</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Date Filter"
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
                  <InputLabel id="demo-simple-select-outlined-label">Range</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Range"
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

export default PaymentReport;
