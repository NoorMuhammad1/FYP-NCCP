import React                       from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Input                       from '../../UI/Input/input';
import StepTwelveValidator         from './StepTwelveValidator';
import useStepTwelveForm           from './useStepTwelveForm';

function Step12(props) {
  const handleSubmission = () => {
    props.next({
                 Medium: value,
               });
  };

  const { handleSubmit, value, updateValue, errors } = useStepTwelveForm(
    props.data,
    handleSubmission,
    StepTwelveValidator
  );
  return (
    <Container fluid>
      <h1>Medium</h1>
      <Form>
        <Input
          label="Medium Number"
          type="text"
          name="MediumNumber"
          placeholder="Enter Medium Number here"
          value={value.MediumNumber}
          onChange={(e) => updateValue(e)}
        />
        {errors.MediumNumber && (
          <p style={{ color: 'red' }}>{errors.MediumNumber}</p>
        )}
        <Input
          label="Medium Name"
          type="text"
          name="MediumName"
          placeholder="Enter Medium Name here"
          value={value.MediumName}
          onChange={(e) => updateValue(e)}
        />
        {errors.MediumName && (
          <p style={{ color: 'red' }}>{errors.MediumName}</p>
        )}
        <Input
          label="Medium Composition"
          type="text"
          name="MediumComposition"
          placeholder="Enter Medium Composition here"
          value={value.MediumComposition}
          onChange={(e) => updateValue(e)}
        />
        {errors.MediumComposition && (
          <p style={{ color: 'red' }}>{errors.MediumComposition}</p>
        )}
        <Input
          label="Medium PH"
          type="text"
          name="MediumPH"
          placeholder="Enter Medium PH here"
          value={value.MediumPH}
          onChange={(e) => updateValue(e)}
        />
        {errors.MediumPH && <p style={{ color: 'red' }}>{errors.MediumPH}</p>}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step12;
