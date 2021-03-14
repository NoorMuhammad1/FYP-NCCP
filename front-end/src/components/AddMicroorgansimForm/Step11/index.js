import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../UI/Input/input";
import StepElevenValidator from "./StepElevenValidator";
import useStepElevenForm from "./useStepElevenForm";

function Step11(props) {
  const handleSubmission = () => {
    props.next({
      ChemistryAndEnzymes: value,
    });
  };

  const { handleSubmit, value, updateValue, errors } = useStepElevenForm(
    props.data,
    handleSubmission,
    StepElevenValidator
  );
  return (
    <Container fluid>
      <h1>Chemistry And Enzymes</h1>
      <Form>
        <Input
          label="Enzymes Produced"
          type="text"
          name="EnzymesProduced"
          placeholder="Enter Enzymes Produced here"
          value={value.EnzymesProduced}
          onChange={(e) => updateValue(e)}
        />
        {errors.EnzymesProduced && (
          <p style={{ color: "red" }}>{errors.EnzymesProduced}</p>
        )}
        <Input
          label="Decomposition And Deteriorating Capabilities"
          type="text"
          name="DecompositionAndDeterioratingCapabilities"
          placeholder="Enter Decomposition And Deteriorating Capabilities here"
          value={value.DecompositionAndDeterioratingCapabilities}
          onChange={(e) => updateValue(e)}
        />
        {errors.DecompositionAndDeterioratingCapabilities && (
          <p style={{ color: "red" }}>
            {errors.DecompositionAndDeterioratingCapabilities}
          </p>
        )}
        <Input
          label="Metabolities Produced"
          type="text"
          name="MetabolitiesProduced"
          placeholder="Enter Metabolities Produced here"
          value={value.MetabolitiesProduced}
          onChange={(e) => updateValue(e)}
        />
        {errors.MetabolitiesProduced && (
          <p style={{ color: "red" }}>{errors.MetabolitiesProduced}</p>
        )}
        <Input
          label="Bio transformations"
          type="text"
          name="Biotransformations"
          placeholder="Enter Bio transformations here"
          value={value.Biotransformations}
          onChange={(e) => updateValue(e)}
        />
        {errors.Biotransformations && (
          <p style={{ color: "red" }}>{errors.Biotransformations}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step11;
