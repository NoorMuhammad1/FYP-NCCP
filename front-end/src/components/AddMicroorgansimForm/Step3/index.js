import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../UI/Input/input";
import StepThreeValidator from "./StepThreeValidator";
import useStepThreeForm from "./useStepThreeForm";

function Step3(props) {
  const handleSubmission = () => {
    props.next({
      StrainAdministration: value,
    });
  };

  const { handleSubmit, value, updateValue, errors } = useStepThreeForm(
    props.data,
    handleSubmission,
    StepThreeValidator
  );
  return (
    <Container fluid>
      <h1>Strain Administration</h1>
      <Form>
        <Input
          label="Date of Accession"
          type="date"
          name="DateOfAccession"
          placeholder="Enter Date of Accession Here"
          value={value.DateOfAccession}
          onChange={(e) => updateValue(e)}
        />
        {errors.DateOfAccession && (
          <p style={{ color: "red" }}>{errors.DateOfAccession}</p>
        )}
        <Input
          label="HerbariumNo"
          type="text"
          name="HerbariumNo"
          placeholder="Enter HerbariumNo here"
          value={value.HerbariumNo}
          onChange={(e) => updateValue(e)}
        />
        {errors.HerbariumNo && (
          <p style={{ color: "red" }}>{errors.HerbariumNo}</p>
        )}
        <Input
          label="Internal Identity Check"
          type="text"
          name="InternalIdentityCheck"
          placeholder="Enter Internal Identity Check here"
          value={value.InternalIdentityCheck}
          onChange={(e) => updateValue(e)}
        />
        {errors.InternalIdentityCheck && (
          <p style={{ color: "red" }}>{errors.InternalIdentityCheck}</p>
        )}
        <Input
          label="Mode Of Preservation"
          type="text"
          name="ModeOfPreservation"
          placeholder="Enter Mode Of Preservation here"
          value={value.ModeOfPreservation}
          onChange={(e) => updateValue(e)}
        />
        {errors.ModeOfPreservation && (
          <p style={{ color: "red" }}>{errors.ModeOfPreservation}</p>
        )}

        <Form.Label>Bio Hazard Level</Form.Label>
        <Form.Control
          as="select"
          value={value.BioHazardLevel}
          name="BioHazardLevel"
          onChange={(e) => updateValue(e)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </Form.Control>
        {errors.BioHazardLevel && (
          <p style={{ color: "red" }}>{errors.BioHazardLevel}</p>
        )}
        <Input
          label="Remarks on Restrictions"
          type="text"
          name="RestrictionRemarks"
          placeholder="Enter Restriction Remarks here"
          value={value.RestrictionRemarks}
          onChange={(e) => updateValue(e)}
        />
        {errors.RestrictionRemarks && (
          <p style={{ color: "red" }}>{errors.RestrictionRemarks}</p>
        )}
        <Input
          label="Country of Export"
          type="text"
          name="CountryOfExport"
          placeholder="Enter Country of Export here"
          value={value.CountryOfExport}
          onChange={(e) => updateValue(e)}
        />
        {errors.CountryOfExport && (
          <p style={{ color: "red" }}>{errors.CountryOfExport}</p>
        )}
        <Input
          label="MTA"
          type="text"
          name="MTA"
          placeholder="Enter MTA here"
          value={value.MTA}
          onChange={(e) => updateValue(e)}
        />
        {errors.MTA && <p style={{ color: "red" }}>{errors.MTA}</p>}
        <Input
          label="Distribution Restriction"
          type="text"
          name="DistributionRestriction"
          placeholder="Enter Distribution Restriction here"
          value={value.DistributionRestriction}
          onChange={(e) => updateValue(e)}
        />
        {errors.DestributionRestriction && (
          <p style={{ color: "red" }}>{errors.DestributionRestriction}</p>
        )}
        <Input
          label="Animal Quarantine No"
          type="text"
          name="AnimalQuarantineNo"
          placeholder="Enter Animal Quarantine No here"
          value={value.AnimalQuarantineNo}
          onChange={(e) => updateValue(e)}
        />
        {errors.AnimalQuarantineNo && (
          <p style={{ color: "red" }}>{errors.AnimalQuarantineNo}</p>
        )}
        <Input
          label="Plant Quarantine No"
          type="text"
          name="PlantQuarantineNo"
          placeholder="Enter Plant Quarantine No here"
          value={value.PlantQuarantineNo}
          onChange={(e) => updateValue(e)}
        />
        {errors.PlantQuarantineNo && (
          <p style={{ color: "red" }}>{errors.PlantQuarantineNo}</p>
        )}
        <Input
          label="Form of Supply"
          type="text"
          name="FormOfSupply"
          placeholder="Enter Form of Supply here"
          value={value.FormOfSupply}
          onChange={(e) => updateValue(e)}
        />
        {errors.FormOfSupply && (
          <p style={{ color: "red" }}>{errors.FormOfSupply}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step3;
