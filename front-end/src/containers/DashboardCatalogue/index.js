import React, { useEffect, useRef, useState }           from 'react';
import { Button, Container, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector }                     from 'react-redux';
import { Link, Redirect }                               from 'react-router-dom';
import { deleteMicroorganism, getCatalogueData, }       from '../../actions/catalogue.actions';
import Layout                                           from '../../components/Layout';
import DeleteUserModal                                  from '../../components/Modals/DeleteUserModal';
import Input                                            from '../../components/UI/Input/input';

const DashboardCatalogue = (props) => {
  const { authenticate, token } = useSelector((state) => state.auth);
  const { permissions } = useSelector((state) => state.auth.user);
  const { catalogueData, fetching } = useSelector((state) => state.catalogue);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const filters = [
    'bacteria',
    'fungi',
    'archaea',
    'antibody',
    'microalgae',
    'phage',
    'virus',
    'yeast',
  ];
  const [searchFilters, setSearchFilters] = useState([]);

  useEffect(() => {
    dispatch(getCatalogueData(token));
  }, []);

  useEffect(() => {
    setData(catalogueData);
  }, [catalogueData]);

  //delete hook
  const [deleteRecordId, setDeleteRecordId] = useState('');

  const columns = data[0] && Object.keys(data[0].CoreDataSets);

  const search = (rows) => {
    return rows.filter((row) => {
      const applyFilter = searchFilters[0]
        ? searchFilters.includes(
          row['CoreDataSets']['OrganismType'].toLowerCase()
        )
        : true;

      return (
        columns &&
        columns.some(
          (column) =>
            applyFilter &&
            row['CoreDataSets'][column]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
        )
      );
    });
  };

  const deleteRecord = () => {
    const data = {
      id: deleteRecordId,
    };
    dispatch(deleteMicroorganism(data, token));
  };

  const recordOptions = (id) => {
    return (
      <>
        <Link
          to={{
            pathname: permissions.view_M_Permission
              ? '/dashboard/details'
              : '#',
            state   : { id: permissions.view_M_Permission ? id : undefined },
          }}
        >
          <Button
            variant={permissions.view_M_Permission ? 'primary' : 'secondary'}
          >
            View
          </Button>
        </Link>
        <Button
          variant={permissions.delete_M_Permission ? 'danger' : 'secondary'}
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

  const deleteRecordRef = useRef();
  const microroganismAddRef = useRef();

  if (!authenticate) {
    return <Redirect to="/" />;
  }

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

      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Container>
        <Row
          style={{
            display       : 'flex',
            justifyContent: 'space-between',
          }}
        >
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
          <Link to="/dashboard/addMicroorganism">
            <Button>Add</Button>
          </Link>
        </Row>
      </Container>
      <Table striped bordered hover responsive>
        <thead>
        <tr>
          {columns &&
          columns.map((heading) => {
            return <th>{heading}</th>;
          })}
          <th className="text-center">Options</th>
        </tr>
        </thead>
        <tbody>
        {search(data).map((row) => {
          return (
            <tr>
              {columns.map((heading) => {
                return <td>{row['CoreDataSets'][heading]}</td>;
              })}
              <td style={{ display: 'flex', justifyContent: 'space-around' }}>
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

export default DashboardCatalogue;
