import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../UI/Input/input";
import StepThirteenValidator from "./StepThirteenValidator";
import useStepThirteenForm from "./useStepThirteenForm";

function Step13(props) {
  const handleSubmission = () => {
    props.next({
      Sequence: value,
    });
  };

  const { handleSubmit, value, updateValue, errors } = useStepThirteenForm(
    props.data,
    handleSubmission,
    StepThirteenValidator
  );
  return (
    <Container fluid>
      <h1>Sequence</h1>
      <Form>
        <Input
          label="Accession Number"
          type="text"
          name="AccessionNumber"
          placeholder="Enter Accession Number here"
          value={value.AccessionNumber}
          onChange={(e) => updateValue(e)}
        />
        {errors.AccessionNumber && (
          <p style={{ color: "red" }}>{errors.AccessionNumber}</p>
        )}
        <Input
          label="Target Gene"
          type="text"
          name="TargetGene"
          placeholder="Enter Target Gene here"
          value={value.TargetGene}
          onChange={(e) => updateValue(e)}
        />
        {errors.TargetGene && (
          <p style={{ color: "red" }}>{errors.TargetGene}</p>
        )}
        <Input
          label="Definition"
          type="text"
          name="Definition"
          placeholder="Enter Definition here"
          value={value.Definition}
          onChange={(e) => updateValue(e)}
        />
        {errors.Definition && (
          <p style={{ color: "red" }}>{errors.Definition}</p>
        )}
        <Input
          label="Sequencing Method"
          type="text"
          name="SequencingMethod"
          placeholder="Enter Sequencing Method here"
          value={value.SequencingMethod}
          onChange={(e) => updateValue(e)}
        />
        {errors.SequencingMethod && (
          <p style={{ color: "red" }}>{errors.SequencingMethod}</p>
        )}
        <Input
          label="Length"
          type="text"
          name="Length"
          placeholder="Enter Length here"
          value={value.Length}
          onChange={(e) => updateValue(e)}
        />
        {errors.Length && <p style={{ color: "red" }}>{errors.Length}</p>}
        <Input
          label="Sequence Type"
          type="text"
          name="SequenceType"
          placeholder="Enter Sequence Type here"
          value={value.SequenceType}
          onChange={(e) => updateValue(e)}
        />
        {errors.SequenceType && (
          <p style={{ color: "red" }}>{errors.SequenceType}</p>
        )}
        <Input
          label="Source"
          type="text"
          name="Source"
          placeholder="Enter Source here"
          value={value.Source}
          onChange={(e) => updateValue(e)}
        />
        {errors.Source && <p style={{ color: "red" }}>{errors.Source}</p>}
        <Input
          label="Sequence"
          type="text"
          name="Sequence"
          placeholder="Enter Sequence here"
          value={value.Sequence}
          onChange={(e) => updateValue(e)}
        />
        {errors.Sequence && <p style={{ color: "red" }}>{errors.Sequence}</p>}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step13;
