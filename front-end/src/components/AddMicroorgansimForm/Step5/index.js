import React                       from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Input                       from '../../UI/Input/input';
import StepFiveValidator           from './StepFiveValidator';
import useStepFiveForm             from './useStepFiveForm';

function Step5(props) {
  const handleSubmission = () => {
    props.next({
                 Publication: value,
               });
  };

  const { handleSubmit, value, updateValue, errors } = useStepFiveForm(
    props.data,
    handleSubmission,
    StepFiveValidator
  );
  return (
    <Container fluid>
      <h1>Publication</h1>
      <Form>
        <Input
          label="Literature Categories"
          type="text"
          name="LiteratureCategories"
          placeholder="Enter Literature Categories here"
          value={value.LiteratureCategories}
          onChange={(e) => updateValue(e)}
        />
        {errors.LiteratureCategories && (
          <p style={{ color: 'red' }}>{errors.LiteratureCategories}</p>
        )}
        <Input
          label="Title"
          type="text"
          name="Title"
          placeholder="Enter Title here"
          value={value.Title}
          onChange={(e) => updateValue(e)}
        />
        {errors.Title && <p style={{ color: 'red' }}>{errors.Title}</p>}
        <Input
          label="Author"
          type="text"
          name="Author"
          placeholder="Enter Author here"
          value={value.Author}
          onChange={(e) => updateValue(e)}
        />
        {errors.Author && <p style={{ color: 'red' }}>{errors.Author}</p>}
        <Input
          label="Journal"
          type="text"
          name="Journal"
          placeholder="Enter Journal here"
          value={value.Journal}
          onChange={(e) => updateValue(e)}
        />
        {errors.Journal && <p style={{ color: 'red' }}>{errors.Journal}</p>}
        <Input
          label="Volume"
          type="text"
          name="Volume"
          placeholder="Enter Volume here"
          value={value.Volume}
          onChange={(e) => updateValue(e)}
        />
        {errors.Volume && <p style={{ color: 'red' }}>{errors.Volume}</p>}
        <Input
          label="Number"
          type="text"
          name="Number"
          placeholder="Enter Number here"
          value={value.Number}
          onChange={(e) => updateValue(e)}
        />
        {errors.Number && <p style={{ color: 'red' }}>{errors.Number}</p>}
        <Input
          label="Starting Page"
          type="text"
          name="StartingPage"
          placeholder="Enter Starting Page here"
          value={value.StartingPage}
          onChange={(e) => updateValue(e)}
        />
        {errors.StartingPage && (
          <p style={{ color: 'red' }}>{errors.StartingPage}</p>
        )}
        <Input
          label="Page Range"
          type="text"
          name="PageRange"
          placeholder="Enter Page Range here"
          value={value.PageRange}
          onChange={(e) => updateValue(e)}
        />
        {errors.PageRange && <p style={{ color: 'red' }}>{errors.PageRange}</p>}
        <Input
          label="Year"
          type="text"
          name="Year"
          placeholder="Enter Year here"
          value={value.Year}
          onChange={(e) => updateValue(e)}
        />
        {errors.Year && <p style={{ color: 'red' }}>{errors.Year}</p>}
        <Input
          label="DOI Number"
          type="text"
          name="DOINumber"
          placeholder="Enter DOI Number here"
          value={value.DOINumber}
          onChange={(e) => updateValue(e)}
        />
        {errors.DOINumber && <p style={{ color: 'red' }}>{errors.DOINumber}</p>}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step5;
