import React    from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.vlaue}
        onChange={props.onChange}
        {...props}
      />
    </Form.Group>
  );
};

export default Input;
