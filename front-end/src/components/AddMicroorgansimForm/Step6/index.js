import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../UI/Input/input";
import StepSixValidator from "./StepSixValidator";
import useStepSixForm from "./useStepSixForm";

function Step6(props) {
  const handleSubmission = () => {
    props.next({
      BiologicalInteractions: value,
    });
  };

  const { handleSubmit, value, updateValue, errors } = useStepSixForm(
    props.data,
    handleSubmission,
    StepSixValidator
  );
  return (
    <Container fluid>
      <h1>Biological Interactions</h1>
      <Form>
        <Input
          label="Symbiosis"
          type="text"
          name="Symbiosis"
          placeholder="Enter Symbiosis here"
          value={value.Symbiosis}
          onChange={(e) => updateValue(e)}
        />
        {errors.Symbiosis && <p style={{ color: "red" }}>{errors.Symbiosis}</p>}
        <Input
          label="Mycoparasitism"
          type="text"
          name="Mycoparasitism"
          placeholder="Enter Mycoparasitism here"
          value={value.Mycoparasitism}
          onChange={(e) => updateValue(e)}
        />
        {errors.Mycoparasitism && (
          <p style={{ color: "red" }}>{errors.Mycoparasitism}</p>
        )}
        <Input
          label="Pathogenicity"
          type="text"
          name="Pathogenicity"
          placeholder="Enter Pathogenicity here"
          value={value.Pathogenicity}
          onChange={(e) => updateValue(e)}
        />
        {errors.Pathogenicity && (
          <p style={{ color: "red" }}>{errors.Pathogenicity}</p>
        )}
        <Input
          label="Allergenicity"
          type="text"
          name="Allergenicity"
          placeholder="Enter Allergenicity here"
          value={value.Allergenicity}
          onChange={(e) => updateValue(e)}
        />
        {errors.Allergenicity && (
          <p style={{ color: "red" }}>{errors.Allergenicity}</p>
        )}
        <Input
          label="Other Organism Toxicity"
          type="text"
          name="OtherOrganismToxicity"
          placeholder="Enter Other Organism Toxicity here"
          value={value.OtherOrganismToxicity}
          onChange={(e) => updateValue(e)}
        />
        {errors.OtherOrganismToxicity && (
          <p style={{ color: "red" }}>{errors.OtherOrganismToxicity}</p>
        )}
        <Input
          label="Antagonistic Activities"
          type="text"
          name="AntagonisticActivities"
          placeholder="Enter Antagonistic Activities here"
          value={value.AntagonisticActivities}
          onChange={(e) => updateValue(e)}
        />
        {errors.AntagonisticActivities && (
          <p style={{ color: "red" }}>{errors.AntagonisticActivities}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step6;
