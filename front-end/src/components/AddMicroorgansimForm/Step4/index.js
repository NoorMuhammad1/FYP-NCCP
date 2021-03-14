import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../UI/Input/input";
import StepFourValidator from "./StepFourValidator";
import useStepFourForm from "./useStepFourForm";

function Step4(props) {
  const handleSubmission = () => {
    props.next({
      EnviromentAndHistory: value,
    });
  };

  const { handleSubmit, value, updateValue, errors } = useStepFourForm(
    props.data,
    handleSubmission,
    StepFourValidator
  );
  return (
    <Container fluid>
      <h1>Enviroment And History</h1>
      <Form>
        <Input
          label="SubStrate"
          type="text"
          name="SubStrate"
          placeholder="Enter SubStrate here"
          value={value.SubStrate}
          onChange={(e) => updateValue(e)}
        />
        {errors.SubStrate && <p style={{ color: "red" }}>{errors.SubStrate}</p>}
        <Input
          label="Habitat"
          type="text"
          name="Habitat"
          placeholder="Enter Habitat here"
          value={value.Habitat}
          onChange={(e) => updateValue(e)}
        />
        {errors.Habitat && <p style={{ color: "red" }}>{errors.Habitat}</p>}
        <Input
          label="Latitude"
          type="text"
          name="Latitude"
          placeholder="Enter Latitude here"
          value={value.Latitude}
          onChange={(e) => updateValue(e)}
        />
        {errors.Latitude && <p style={{ color: "red" }}>{errors.Latitude}</p>}
        <Input
          label="Longitude"
          type="text"
          name="Longitude"
          placeholder="Enter Longitude here"
          value={value.Longitude}
          onChange={(e) => updateValue(e)}
        />
        {errors.Longitude && <p style={{ color: "red" }}>{errors.Longitude}</p>}
        <Input
          label="Altitude"
          type="text"
          name="Altitude"
          placeholder="Enter Altitude here"
          value={value.Altitude}
          onChange={(e) => updateValue(e)}
        />
        {errors.Altitude && <p style={{ color: "red" }}>{errors.Altitude}</p>}
        <Input
          label="Depth"
          type="text"
          name="Depth"
          placeholder="Enter Depth here"
          value={value.Depth}
          onChange={(e) => updateValue(e)}
        />
        {errors.Depth && <p style={{ color: "red" }}>{errors.Depth}</p>}
        <Input
          label="Humidity"
          type="text"
          name="Humidity"
          placeholder="Enter Humidity here"
          value={value.Humidity}
          onChange={(e) => updateValue(e)}
        />
        {errors.Humidity && <p style={{ color: "red" }}>{errors.Humidity}</p>}
        <Input
          label="PH for Enviroment"
          type="text"
          name="PHForEnviroment"
          placeholder="Enter PH for Enviroment here"
          value={value.PHForEnviroment}
          onChange={(e) => updateValue(e)}
        />
        {errors.PHForEnviroment && (
          <p style={{ color: "red" }}>{errors.PHForEnviroment}</p>
        )}
        <Input
          label="Temperature for Enviroment"
          type="text"
          name="TemperatureForEnviroment"
          placeholder="Enter Temperature for Enviroment here"
          value={value.TemperatureForEnviroment}
          onChange={(e) => updateValue(e)}
        />
        {errors.TemperatureForEnviroment && (
          <p style={{ color: "red" }}>{errors.TemperatureForEnviroment}</p>
        )}
        <Input
          label="CollectionMethod"
          type="text"
          name="CollectionMethod"
          placeholder="Enter CollectionMethod here"
          value={value.CollectionMethod}
          onChange={(e) => updateValue(e)}
        />
        {errors.CollectionMethod && (
          <p style={{ color: "red" }}>{errors.CollectionMethod}</p>
        )}
        <Input
          label="Date of Collection"
          type="date"
          name="DateOfCollection"
          placeholder="Enter Date of collection here"
          value={value.DateOfCollection}
          onChange={(e) => updateValue(e)}
        />
        {errors.DateOfCollection && (
          <p style={{ color: "red" }}>{errors.DateOfCollection}</p>
        )}
        <Input
          label="Country of Collection"
          type="text"
          name="CountryOfCollection"
          placeholder="Enter Country of Collection here"
          value={value.CountryOfCollection}
          onChange={(e) => updateValue(e)}
        />
        {errors.CountryOfCollection && (
          <p style={{ color: "red" }}>{errors.CountryOfCollection}</p>
        )}
        <Input
          label="State"
          type="text"
          name="State"
          placeholder="Enter State here"
          value={value.State}
          onChange={(e) => updateValue(e)}
        />
        {errors.State && <p style={{ color: "red" }}>{errors.State}</p>}
        <Input
          label="Region of Collection"
          type="text"
          name="RegionOfCollection"
          placeholder="Enter Region of Collection here"
          value={value.RegionOfCollection}
          onChange={(e) => updateValue(e)}
        />
        {errors.RegionOfCollection && (
          <p style={{ color: "red" }}>{errors.RegionOfCollection}</p>
        )}
        <Input
          label="Collected By"
          type="text"
          name="CollectedBy"
          placeholder="Collected By"
          value={value.CollectedBy}
          onChange={(e) => updateValue(e)}
        />
        {errors.CollectedBy && (
          <p style={{ color: "red" }}>{errors.CollectedBy}</p>
        )}
        <Input
          label="Isolated By"
          type="text"
          name="IsolatedBy"
          placeholder="Enter Isolated By here"
          value={value.IsolatedBy}
          onChange={(e) => updateValue(e)}
        />
        {errors.IsolatedBy && (
          <p style={{ color: "red" }}>{errors.IsolatedBy}</p>
        )}
        <Input
          label="Method of Isolation"
          type="text"
          name="MethodOfIsolation"
          placeholder="Method of Isolation"
          value={value.MethodOfIsolation}
          onChange={(e) => updateValue(e)}
        />
        {errors.MethodOfIsolation && (
          <p style={{ color: "red" }}>{errors.MethodOfIsolation}</p>
        )}
        <Input
          label="Identified By"
          type="text"
          name="IdentifiedBy"
          placeholder="IdentifiedBy"
          value={value.IdentifiedBy}
          onChange={(e) => updateValue(e)}
        />
        {errors.IdentifiedBy && (
          <p style={{ color: "red" }}>{errors.IdentifiedBy}</p>
        )}
        <Input
          label="Date Of Identification"
          type="date"
          name="DateOfIdentification"
          placeholder="Date Of Identification"
          value={value.DateOfIdentification}
          onChange={(e) => updateValue(e)}
        />
        {errors.DateOfIdentification && (
          <p style={{ color: "red" }}>{errors.DateOfIdentification}</p>
        )}
        <Input
          label="Deposited By"
          type="text"
          name="DepositedBy"
          placeholder="Deposited By"
          value={value.DepositedBy}
          onChange={(e) => updateValue(e)}
        />
        {errors.DepositedBy && (
          <p style={{ color: "red" }}>{errors.DepositedBy}</p>
        )}
        <Input
          label="Date of Deposition"
          type="date"
          name="DateOfDeposition"
          placeholder="Date of Deposition"
          value={value.DateOfDeposition}
          onChange={(e) => updateValue(e)}
        />
        {errors.DateOfDeposition && (
          <p style={{ color: "red" }}>{errors.DateOfDeposition}</p>
        )}
        <Input
          label="Name At Accept"
          type="text"
          name="NameAtAccept"
          placeholder="Name At Accept"
          value={value.NameAtAccept}
          onChange={(e) => updateValue(e)}
        />
        {errors.NameAtAccept && (
          <p style={{ color: "red" }}>{errors.NameAtAccept}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step4;
