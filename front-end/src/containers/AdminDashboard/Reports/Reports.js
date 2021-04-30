import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@material-ui/data-grid';
import SideBar                                             from 'components/SideBar';
import React                                               from 'react';

// Todo: Remove Dummy Data:
const rows: GridRowsProp = [
  { id: Date.now() + 1, userId: '1', userName: 'User-1', orderId: 'O-1', status: 'Pending' },
  { id: Date.now() + 2, userId: '2', userName: 'User-2', orderId: 'O-2', status: 'In Process' },
  { id: Date.now() + 3, userId: '3', userName: 'User-3', orderId: 'O-3', status: 'Done' },
  { id: Date.now() + 4, userId: '3', userName: 'User-3', orderId: 'O-4', status: 'Pending' },
  { id: Date.now() + 5, userId: '1', userName: 'User-1', orderId: 'O-5', status: 'Return' }
];

// Todo: Remove Dummy Data:
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 150 }, // UNIQUE ID COLUMN
  { field: 'userId', headerName: 'User Id', width: 150 },
  { field: 'userName', headerName: 'Username', width: 150 },
  { field: 'orderId', headerName: 'Order Id', width: 150 },
  { field: 'status', headerName: 'Order Status', width: 150 },
];

const Reports = () => {
  return (
    <SideBar active="Reports">
      <h1>Reports</h1>
      <br /><br />
      <div className="container-fluid">
        <div className="row" style={{ height: 300 }}>
          <div className="col-12">
            <DataGrid rows={rows} columns={columns} components={{
              Toolbar: GridToolbar,
            }} />
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default Reports;
