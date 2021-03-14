import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../UI/Input/input";
import StepSevenValidator from "./StepSevenValidator";
import useStepSevenForm from "./useStepSevenForm";

function Step7(props) {
  const handleSubmission = () => {
    props.next({
      Sexuality: value,
    });
  };

  const { handleSubmit, value, updateValue, errors } = useStepSevenForm(
    props.data,
    handleSubmission,
    StepSevenValidator
  );
  return (
    <Container fluid>
      <h1>Sexuality</h1>
      <Form>
        <Input
          label="Sexual Behaviour"
          type="text"
          name="SexualBehaviour"
          placeholder="Enter Sexual Behaviour here"
          value={value.SexualBehaviour}
          onChange={(e) => updateValue(e)}
        />
        {errors.SexualBehaviour && (
          <p style={{ color: "red" }}>{errors.SexualBehaviour}</p>
        )}
        <Input
          label="Sexual State"
          type="text"
          name="SexualState"
          placeholder="Enter Sexual State here"
          value={value.SexualState}
          onChange={(e) => updateValue(e)}
        />
        {errors.SexualState && (
          <p style={{ color: "red" }}>{errors.SexualState}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step7;
