import { Modal, Button } from "react-bootstrap";
import React from "react";

const CustomModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.close} size="lg" centered>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button variant="primary" onClick={props.save}>
          {props.saveText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
