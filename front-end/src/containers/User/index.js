import React, { useEffect, useState }                   from 'react';
import { Button, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector }                     from 'react-redux';
import { Redirect }                                     from 'react-router-dom';
import { getUserData, updateUserInfo }                  from '../../actions/user.actions';
import Layout                                           from '../../components/Layout';
import Input                                            from '../../components/UI/Input/input';

const User = (props) => {
  const authenticate = useSelector((state) => state.auth.authenticate);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { userID } = props.location.state;

  const user = useSelector((state) => state.user);

  const [updateUser, setUpdateUser] = useState(
    useSelector((state) => state.userUpdate)
  );
  const update = useSelector((state) => state.userUpdate);

  const [userData, setUserData] = useState({});
  const [updateForm, setUpdateForm] = useState(false);
  const [savingData, setSavingData] = useState(false);

  useEffect(() => {
    dispatch(getUserData(userID, token));
  }, []);

  useEffect(() => {
    setUserData(user.user);
  }, [user]);

  const updateValue = (e) => {
    setUserData({
                  ...userData,
                  [e.target.name]: e.target.value,
                });
  };

  const handleUpdateForm = (command) => {
    if (command === 'save') {
      dispatch(updateUserInfo(userData, token));
      setSavingData(!savingData);
    }
    setUpdateForm(!updateForm);
  };

  if (!authenticate) {
    return <Redirect to="/" />;
  }
  return (
    <Layout sidebar>
      {update.updating ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>
          <p>{JSON.stringify(update.message)}</p>
          <Button
            onClick={(e) =>
              handleUpdateForm(e.target.innerHTML.trim().toLowerCase())
            }
          >
            {updateForm ? 'Save' : 'Edit'}
          </Button>
          <Container>
            <Row>
              <Input
                id="first_name"
                label="Fristname"
                type="text"
                name="firstname"
                disabled={!updateForm}
                value={userData.firstname}
                onChange={(e) => updateValue(e)}
                placeholder="Firstname"
              />
            </Row>
            <Row>
              <Input
                id="last_name"
                label="Lastname"
                type="text"
                name="lastname"
                value={userData.lastname}
                disabled={!updateForm}
                onChange={(e) => updateValue(e)}
                placeholder="Lastname"
              />
            </Row>
            <Row>
              <Input
                id="email"
                label="Email"
                type="text"
                name="email"
                value={userData.email}
                disabled={!updateForm}
                onChange={(e) => updateValue(e)}
                placeholder="Email"
              />
            </Row>
            <Row>
              <Input
                id="contact-number"
                label="Contact Number"
                type="text"
                name="contactNumber"
                value={userData.contactNumber}
                disabled={!updateForm}
                onChange={(e) => updateValue(e)}
                placeholder="Contact Number"
              />
            </Row>
            <Row>
              <Form.Label>Profile Picture</Form.Label>
              <Image src="https://picsum.photos/171/180" roundedCircle />
            </Row>
            <Row>
              <Input
                id="affiliation"
                label="Affiliation"
                type="text"
                name="affiliation"
                value={userData.affiliation ? userData.affiliation : 'NULL'}
                disabled={!updateForm}
                onChange={(e) => updateValue(e)}
                placeholder="Affiliation"
              />
            </Row>
            <Row>
              <Input
                id="description"
                label="Description"
                type="textarea"
                as="textarea"
                rows={3}
                name="description"
                value={userData.description}
                disabled={!updateForm}
                onChange={(e) => updateValue(e)}
                placeholder="Description"
              />
            </Row>
            {userData.permissions
              ? Object.keys(userData.permissions).map((permission) => (
                <Form.Check
                  label={permission}
                  name={permission}
                  checked={userData.permissions[permission]}
                  disabled={!updateForm}
                  onChange={(e) =>
                    (userData.permissions[permission] = e.target.checked)
                  }
                ></Form.Check>
              ))
              : undefined}
          </Container>
        </>
      )}
    </Layout>
  );
};

export default User;
