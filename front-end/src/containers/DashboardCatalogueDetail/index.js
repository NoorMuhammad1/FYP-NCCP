import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import axios from "../../helpers/axios";

const DashboardCatalogueDetail = (props) => {
  const { token } = useSelector((state) => state.auth);
  const { id } = props.location.state;
  const [data, setData] = useState({});

  const [option, setOption] = useState(false);

  const handleUpdateForm = (command) => {
    if (command === "save") {
      // dispatch(updateUserInfo(userData, token));
      // setSavingData(!savingData);
    }
    setOption(!option);
  };

  useEffect(async () => {
    const res = await axios.post(
      "/findmicroorganism",
      { id }
      // { headers: { authorization: token } }
    );
    setData(res.data);
  }, []);
  return (
    <Layout sidebar>
      <Button
        onClick={(e) =>
          handleUpdateForm(e.target.innerHTML.trim().toLowerCase())
        }
      >
        {option ? "Save" : "Edit"}
      </Button>
      <Accordion defaultActiveKey="0">
        {Object.keys(data).map((heading, key) => {
          return (
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={`${key}`}>
                {heading}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${key}`}>
                <Card.Body>
                  {Object.keys(data[heading]).map((label, i) => {
                    return (
                      <Row className="p-2" key={i}>
                        <Col>{label}</Col>
                        <Col>
                          <Form.Control
                            type="text"
                            style={{ backgroundColor: "green" }}
                            value={data[heading][label]}
                            onChange={(e) => {
                              setData({
                                ...data,
                                [heading]: {
                                  ...data[heading],
                                  [label]: e.target.value,
                                },
                              });
                            }}
                            disabled={!option}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </Layout>
  );
};

export default DashboardCatalogueDetail;
