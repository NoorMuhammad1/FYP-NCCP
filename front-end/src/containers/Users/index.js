import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { getUsers } from "../../actions/user.actions";
import { Link } from "react-router-dom";
import AddUserModal from "../../components/Modals/AddUserModal";
import ResponseModal from "../../components/Modals/ResponseModal";
import DeleteUserModal from "../../components/Modals/DeleteUserModal";
import { deleteMicroorganism } from "../../actions/catalogue.actions";
import Input from "../../components/UI/Input/input";

const Users = (props) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { permissions } = useSelector((state) => state.auth.user);
  const { fetching, users, add_user } = useSelector((state) => state.user);

  /////delete record id
  const [deleteRecordId, setDeleteRecordId] = useState("");
  const deleteRecordRef = useRef();
  const deleteRecord = () => {
    const data = {
      id: deleteRecordId,
    };
    console.log("user deleted");
    dispatch(deleteMicroorganism(data, token));
  };

  useEffect(() => {
    dispatch(getUsers(token));
  }, []);

  ///////////////////////////////////////////////////////
  //query and search
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const filters = ["admin", "internal", "external"];
  const [searchFilters, setSearchFilters] = useState([]);
  useEffect(() => {
    setData(users);
  }, [users]);

  const columns = data[0] && Object.keys(data[0]);

  //request response
  const serverResponseRef = useRef();
  const handleResponse = () => {
    addUserRef.current.show();
  };

  /////add user
  const addUserRef = useRef();
  const handleAddModalShow = () => {
    addUserRef.current.show();
  };

  const handleAddUser = (userData) => {
    console.log("handling add user");
    // dispatch(addUser(userData, token));
  };

  const search = (rows) => {
    return rows.filter((row) => {
      const applyFilter = searchFilters[0]
        ? searchFilters.includes(row["role"].toLowerCase())
        : true;
      return (
        columns &&
        columns.some(
          (column) =>
            applyFilter &&
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) >
              -1
        )
      );
    });
  };

  const recordOptions = (id) => {
    return (
      <>
        <Link
          to={{
            pathname: permissions.view_U_Permission ? "/dashboard/user" : "#",
            state: { userID: permissions.view_U_Permission ? id : undefined },
          }}
        >
          <Button
            variant={permissions.view_U_Permission ? "primary" : "secondary"}
          >
            View
          </Button>
        </Link>
        <Button
          variant={permissions.delete_U_Permission ? "danger" : "secondary"}
          onClick={() => {
            deleteRecordRef.current.show();
            setDeleteRecordId(id);
          }}
        >
          delete
        </Button>
      </>
    );
  };

  if (fetching) {
    return (
      <Layout sidebar>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      <DeleteUserModal
        title="Delete Record"
        confirm={() => deleteRecord()}
        ref={deleteRecordRef}
      >
        Are you sure you want to delete this record
      </DeleteUserModal>

      <AddUserModal ref={addUserRef} confirm={handleAddUser} />
      <ResponseModal
        ref={serverResponseRef}
        message={add_user.message}
        confirm={handleResponse}
      />

      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Container>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          {filters &&
            filters.map((filter) => {
              return (
                <Form.Check
                  label={filter}
                  name={filter}
                  checked={searchFilters.includes(filter)}
                  onChange={(e) => {
                    const checked = searchFilters.includes(filter);
                    setSearchFilters((prev) =>
                      checked
                        ? prev.filter((sf) => sf !== filter)
                        : [...prev, filter]
                    );
                  }}
                />
              );
            })}
          <Button variant="primary" onClick={() => handleAddModalShow()}>
            Add
          </Button>
        </Row>
      </Container>
      <Table stripped bordered hover responsive>
        <thead>
          <tr>
            {columns &&
              columns.map((heading) => {
                return heading === "_id" ? null : <th>{heading}</th>;
              })}
            <th className="text-center">Options</th>
          </tr>
        </thead>
        <tbody>
          {search(data).map((row) => {
            return (
              <tr>
                {columns.map((heading) => {
                  return heading === "_id" ? null : <td>{row[heading]}</td>;
                })}
                <td style={{ display: "flex", justifyContent: "space-around" }}>
                  {recordOptions(row._id)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Users;
