import React                       from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';

function Review(props) {
  return (
    <>
      <h1>Review</h1>
      <Accordion>
        {Object.keys(props.data).map((heading, key) => {
          return (
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={`${key}`}
                style={{
                  cursor        : 'pointer',
                  display       : 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {heading}
                <Button onClick={() => props.set(key)}>Edit</Button>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${key}`}>
                <Card.Body>
                  {Object.keys(props.data[heading]).map((label, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          display       : 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{label}</span>
                        <span>{props.data[heading][label]}</span>
                      </div>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={() => props.submit()}>Submit</Button>
    </>
  );
}

export default Review;
