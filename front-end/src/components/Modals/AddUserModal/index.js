import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Col, Form, Row }                                   from 'react-bootstrap';
import CustomModal                                          from '..';
import Input                                                from '../../UI/Input/input';
import AddUserValidator                                     from './addUserValidator';
import useAddUserForm                                       from './useAddUserForm';

const AddUserModal = forwardRef((props, ref) => {
  const handleConfirm = () => {
    setShow(false);
    props.confirm(value);
  };
  //using custom Add User Hook
  const {
          value,
          handleSubmit,
          updateValue,
          errors,
          updatePermissionValue,
        } = useAddUserForm(handleConfirm, AddUserValidator);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useImperativeHandle(ref, () => {
    return {
      show: () => handleShow(),
    };
  });
  return (
    <CustomModal
      show={show}
      title={'Add User'}
      close={handleClose}
      save={handleSubmit}
      saveText="Submit"
    >
      <Form>
        <Row>
          <Col md={6}>
            <Input
              id="first_name"
              label="Fristname"
              type="text"
              name="firstname"
              value={value.firstname}
              onChange={(e) => updateValue(e)}
              placeholder="Firstname"
            />
            {errors.firstname && <p>{errors.firstname}</p>}
          </Col>
          <Col md={6}>
            <Input
              id="last_name"
              label="Lastname"
              type="text"
              name="lastname"
              value={value.lastname}
              onChange={(e) => updateValue(e)}
              placeholder="Lastname"
            />
            {errors.lastname && <p>{errors.lastname}</p>}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              id="username"
              label="Username"
              type="text"
              name="username"
              value={value.username}
              onChange={(e) => updateValue(e)}
              placeholder="username"
            />
            {errors.username && <p>{errors.username}</p>}
          </Col>
          <Col md={6}>
            <Input
              id="email"
              label="Email"
              type="email"
              name="email"
              value={value.email}
              onChange={(e) => updateValue(e)}
              placeholder="Email"
            />
            {errors.email && <p>{errors.email}</p>}
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form.Label>Role of the user:</Form.Label>
            <div key={`default-radio`} className="mb-3">
              <Form.Check
                label="Internal"
                type="radio"
                id={`default-radio-1`}
                name="role"
                value="internal"
                checked={value.role === 'internal'}
                onChange={(e) => updateValue(e)}
              />
              <Form.Check
                label="Administrator"
                type="radio"
                id={`default-radio-2`}
                name="role"
                value="admin"
                checked={value.role === 'admin'}
                onChange={(e) => updateValue(e)}
              />
              {/* <Form.Check
                label="Industry Representative"
                type="radio"
                id={`default-radio-3`}
                name="user-type"
                value="IndustryRepresentative"
                checked={value.type === "IndustryRepresentative"}
                onChange={(e) => updateValue(e)}
              /> */}
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col md={12}>
            <Input
              id="associated-institute-name"
              label="Associated Institute Name"
              type="text"
              placeholder="Institute name"
              name="affiliation"
              value={value.affiliation}
              onChange={(e) => updateValue(e)}
            />
            {errors.affiliation && <p>{errors.affiliation}</p>}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="description-text-area">
              <Form.Label>Description (of what you do)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={value.description}
                onChange={(e) => updateValue(e)}
              />
              {errors.description && <p>{errors.description}</p>}
            </Form.Group>
          </Col>
        </Row> */}
        <Row>
          <Col md={6}>
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={(e) => updateValue(e)}
            />
          </Col>
          {errors.password && <p>{errors.password}</p>}
          <Col md={6}>
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Retype Password"
              name="confirm_password"
              value={value.confirm_password}
              onChange={(e) => updateValue(e)}
            />
            {errors.confirm_password && <p>{errors.confirm_password}</p>}
          </Col>
        </Row>

        {Object.keys(value.permissions).map((permission) => {
          return (
            <Row>
              <Form.Check
                label={permission}
                name={permission}
                onChange={(e) => updatePermissionValue(e)}
              />
            </Row>
          );
        })}
      </Form>
    </CustomModal>
  );
});

export default AddUserModal;
