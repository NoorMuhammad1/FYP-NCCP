import React                                 from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector }          from 'react-redux';
import { Redirect }                          from 'react-router-dom';
import { signup }                            from '../../actions/signup.actions';
import Layout                                from '../../components/Layout/index';
import Input                                 from '../../components/UI/Input/input';
import useForm                               from './SignUpUseForm';
import SignUpValidator                       from './SignUpValidator';

const Signup = (props) => {
  const signupStore = useSelector((state) => state.sign);

  const dispatch = useDispatch();

  const handleSubmission = () => {
    console.log('handling submission');
    const userData = {
      ...value,
      role: 'external',
    };
    dispatch(signup(userData));
  };

  const { value, handleSubmit, updateValue, errors } = useForm(
    handleSubmission,
    SignUpValidator
  );

  if (signupStore.registered) {
    return <Redirect to={'/'} />;
  }
  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: '2rem' }}>
            <Col md={{ span: 6, offset: 3 }}>
              {signupStore.error.code > 300 && (
                <h2>{signupStore.error.message}</h2>
              )}
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
                    <Form.Label>What type of user are you:</Form.Label>
                    <div key={`default-radio`} className="mb-3">
                      <Form.Check
                        label="Student"
                        type="radio"
                        id={`default-radio-1`}
                        name="user-type"
                        value="Student"
                        checked={value.type === 'Student'}
                        onChange={(e) => updateValue(e)}
                      />
                      <Form.Check
                        label="Research Institute Representative"
                        type="radio"
                        id={`default-radio-2`}
                        name="user-type"
                        value="ResearchInstituteRepresentative"
                        checked={
                          value.type === 'ResearchInstituteRepresentative'
                        }
                        onChange={(e) => updateValue(e)}
                      />
                      <Form.Check
                        label="Industry Representative"
                        type="radio"
                        id={`default-radio-3`}
                        name="user-type"
                        value="IndustryRepresentative"
                        checked={value.type === 'IndustryRepresentative'}
                        onChange={(e) => updateValue(e)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
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
                </Row>
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
                    {errors.confirm_password && (
                      <p>{errors.confirm_password}</p>
                    )}
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Signup;
