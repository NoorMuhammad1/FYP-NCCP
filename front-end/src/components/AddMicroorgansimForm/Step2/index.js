import React                       from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Input                       from '../../UI/Input/input';
import StepTwoValidator            from './StepTwoValidator';
import useStepTwoForm              from './useStepTwoForm';

function Step2(props) {
  const handleSubmission = () => {
    props.next({
                 Name: value,
               });
  };

  const { handleSubmit, value, updateValue, errors } = useStepTwoForm(
    props.data,
    handleSubmission,
    StepTwoValidator
  );
  return (
    <Container fluid>
      <h1>Name</h1>
      <Form>
        <Input
          label="Taxonomy ID"
          type="text"
          name="TaxonomyID"
          placeholder="Enter Taxonomy ID here"
          value={value.TaxonomyID}
          onChange={(e) => updateValue(e)}
        />
        {errors.TaxonomyID && (
          <p style={{ color: 'red' }}>{errors.TaxonomyID}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step2;
