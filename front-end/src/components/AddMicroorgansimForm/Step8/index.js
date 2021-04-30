import React                                  from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import Input                                  from '../../UI/Input/input';
import StepEightValidator                     from './StepEightValidator';
import useStepEightForm                       from './useStepEightForm';

function Step8(props) {
  const handleSubmission = () => {
    props.next({
                 Properties: value,
               });
  };

  const { handleSubmit, value, updateValue, errors } = useStepEightForm(
    props.data,
    handleSubmission,
    StepEightValidator
  );
  return (
    <Container fluid>
      <h1>Properties</h1>
      <Form>
        <Input
          label="Number Of Nuclei"
          type="text"
          name="NumberOfNuclei"
          placeholder="Enter Number Of Nuclei here"
          value={value.NumberOfNuclei}
          onChange={(e) => updateValue(e)}
        />
        {errors.NumberOfNuclei && (
          <p style={{ color: 'red' }}>{errors.NumberOfNuclei}</p>
        )}
        <Input
          label="Rehydration Fluid"
          type="text"
          name="RehydrationFluid"
          placeholder="Enter Rehydration Fluid here"
          value={value.RehydrationFluid}
          onChange={(e) => updateValue(e)}
        />
        {errors.RehydrationFluid && (
          <p style={{ color: 'red' }}>{errors.RehydrationFluid}</p>
        )}
        <Input
          label="Fine Structure Data"
          type="text"
          name="FineStructureData"
          placeholder="Enter Fine Structure Data here"
          value={value.FineStructureData}
          onChange={(e) => updateValue(e)}
        />
        {errors.FineStructureData && (
          <p style={{ color: 'red' }}>{errors.FineStructureData}</p>
        )}
        <Input
          label="WallConstituents"
          type="text"
          name="WallConstituents"
          placeholder="Enter WallConstituents here"
          value={value.WallConstituents}
          onChange={(e) => updateValue(e)}
        />
        {errors.WallConstituents && (
          <p style={{ color: 'red' }}>{errors.WallConstituents}</p>
        )}
        <Input
          label="Cell Contents"
          type="text"
          name="CellContents"
          placeholder="Enter Cell Contents here"
          value={value.CellContents}
          onChange={(e) => updateValue(e)}
        />
        {errors.CellContents && (
          <p style={{ color: 'red' }}>{errors.CellContents}</p>
        )}
        <Input
          label="Coenzyme Q System"
          type="text"
          name="CoenzymeQSystem"
          placeholder="Enter Coenzyme Q System here"
          value={value.CoenzymeQSystem}
          onChange={(e) => updateValue(e)}
        />
        {errors.CoenzymeQSystem && (
          <p style={{ color: 'red' }}>{errors.CoenzymeQSystem}</p>
        )}
        <FormGroup>
          <Form.Label>Staining Reactions</Form.Label>
          <Form.Control
            as="select"
            name="StainingReactions"
            value={value.StainingReactions}
            onChange={(e) => updateValue(e)}
          >
            <option>Positive</option>
            <option>Negative</option>
          </Form.Control>
        </FormGroup>
        {errors.StainingReactions && (
          <p style={{ color: 'red' }}>{errors.StainingReactions}</p>
        )}
        <Input
          label="Pigment Production"
          type="text"
          name="PigmentProduction"
          placeholder="Enter Pigment Production here"
          value={value.PigmentProduction}
          onChange={(e) => updateValue(e)}
        />
        {errors.PigmentProduction && (
          <p style={{ color: 'red' }}>{errors.PigmentProduction}</p>
        )}
        <Input
          label="Cell Shape"
          type="text"
          name="CellShape"
          placeholder="Enter Cell Shape here"
          value={value.CellShape}
          onChange={(e) => updateValue(e)}
        />
        {errors.CellShape && <p style={{ color: 'red' }}>{errors.CellShape}</p>}
        <Input
          label="Cell Size"
          type="text"
          name="CellSize"
          placeholder="Enter Cell Size here"
          value={value.CellSize}
          onChange={(e) => updateValue(e)}
        />
        {errors.CellSize && <p style={{ color: 'red' }}>{errors.CellSize}</p>}
        <FormGroup>
          <Form.Label>Motile</Form.Label>
          <Form.Control
            as="select"
            name="Motile"
            value={value.Motile}
            onChange={(e) => updateValue(e)}
          >
            <option>Motile</option>
            <option>Non-Motile</option>
          </Form.Control>
        </FormGroup>
        {errors.Motile && <p style={{ color: 'red' }}>{errors.Motile}</p>}
        <Input
          label="Spore Forming"
          type="text"
          name="SporeForming"
          placeholder="Enter Spore Forming here"
          value={value.SporeForming}
          onChange={(e) => updateValue(e)}
        />
        {errors.SporeForming && (
          <p style={{ color: 'red' }}>{errors.SporeForming}</p>
        )}
        <Input
          label="Motile By"
          type="text"
          name="MotileBy"
          placeholder="Enter Motile By here"
          value={value.MotileBy}
          onChange={(e) => updateValue(e)}
        />
        {errors.MotileBy && <p style={{ color: 'red' }}>{errors.MotileBy}</p>}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step8;
