import { Button, CircularProgress }   from '@material-ui/core';
// import { Dropdown } from "bootstrap";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { Link }                       from 'react-router-dom';
import { getUsers }                   from '../../actions/user.actions';
import DropDown                       from '../../components/DropDown';
import ItemList                       from '../../components/ItemList';
import SearchBar                      from '../../components/SearchBar';
import SideBar                        from '../../components/SideBar';

import './style.css';

const AdminDashboardUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setData(
      users.userList.map((row) => {
        return {
          ...row,
          orders  : Math.floor(Math.random() * 10),
          deposits: Math.floor(Math.random() * 10),
        };
      })
    );
    // setData(users.userList);
  }, [users]);

  const search = (data) => {
    return data.filter((row) => {
      const applyFilter =
              filter === '' || row.role.toLowerCase() === filter.toLowerCase();
      return (
        applyFilter &&
        (row.firstname.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
          row.lastname.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1)
      );
    });
  };

  const sortData = (data) => {
    data[0] &&
    data.sort((a, b) => b[sortBy.toLowerCase()] - a[sortBy.toLowerCase()]);
    return data.sort(
      (a, b) => b[sortBy.toLowerCase() - a[sortBy.toLowerCase()]]
    );
  };

  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">Users info is being fetched</h3>
        <CircularProgress className="fetch__data__spinner" />
      </div>
    );
  };

  const ErrorMessage = () => {
    return (
      <div className="error__div">
        <h3 className="error__title">{users.error.message}</h3>
      </div>
    );
  };

  if (users.fetching) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">{requestSent()}</div>
      </SideBar>
    );
  }

  if (users.error.found) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">{ErrorMessage()}</div>
      </SideBar>
    );
  }

  const columns = [
    {
      title: 'Name',
      width: '40%',
    },
    {
      title: 'Role',
      width: '10%',
    },
    {
      title: 'Orders',
      width: '15%',
    },
    {
      title: 'Deposits',
      width: '15%',
    },
    {
      title: '',
      width: '10%',
    },
  ];
  return (
    <SideBar active="Users">
      <div className="div__one">
        <SearchBar query={query} setQuery={setQuery} />
        <Button variant="contained" color="primary">
          <Link
            to="/dashboard/addUser"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Add User +
          </Link>
        </Button>
      </div>
      <div className="div__two">
        <h3>Users</h3>
        <div>
          <DropDown
            title="Sort By"
            value={sortBy}
            setValue={setSortBy}
            variant="outlined"
            labelWidth={60}
            width="150px"
            data={[
              {
                title: 'Name',
                value: 'name',
              },
              {
                title: 'Orders',
                value: 'orders',
              },
              {
                title: 'Deposits',
                value: 'deposits',
              },
            ]}
          />
          <DropDown
            title="Role"
            value={filter}
            setValue={setFilter}
            variant="outlined"
            labelWidth={60}
            width="150px"
            data={[
              {
                title: 'Admin',
                value: 'admin',
              },
              {
                title: 'Internal',
                value: 'internal',
              },
              {
                title: 'External',
                value: 'External',
              },
            ]}
          />
        </div>
      </div>
      <div className="div__three">
        <ItemList columns={columns} rows={sortData(search(data))} />
      </div>
    </SideBar>
  );
};

export default AdminDashboardUsers;
