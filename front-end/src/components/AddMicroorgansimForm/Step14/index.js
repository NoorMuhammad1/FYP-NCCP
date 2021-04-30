import React                       from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Input                       from '../../UI/Input/input';
import StepFourteenValidator       from './StepFourteenValidator';
import useStepFourteenForm         from './useStepFourteenForm';

function Step14(props) {
  const handleSubmission = () => {
    props.next({
                 Catalogue: value,
               });
  };

  const { handleSubmit, value, updateValue, errors } = useStepFourteenForm(
    props.data,
    handleSubmission,
    StepFourteenValidator
  );
  return (
    <Container fluid>
      <h1>Catalogue</h1>
      <Form>
        <Input
          label="Catalogue Name"
          type="text"
          name="CatalogueName"
          placeholder="Enter Catalogue Name here"
          value={value.CatalogueName}
          onChange={(e) => updateValue(e)}
        />
        {errors.CatalogueName && (
          <p style={{ color: 'red' }}>{errors.CatalogueName}</p>
        )}
        <Input
          label="Catalogue URL"
          type="text"
          name="CatalogueURL"
          placeholder="Enter Catalogue URL here"
          value={value.CatalogueURL}
          onChange={(e) => updateValue(e)}
        />
        {errors.CatalogueURL && (
          <p style={{ color: 'red' }}>{errors.CatalogueURL}</p>
        )}
        <Input
          label="Catalogue Update Time"
          type="time"
          name="CatalogueUpdateTime"
          placeholder="Enter Catalogue Update Time here"
          value={value.CatalogueUpdateTime}
          onChange={(e) => updateValue(e)}
        />
        {errors.CatalogueUpdateTime && (
          <p style={{ color: 'red' }}>{errors.CatalogueUpdateTime}</p>
        )}
        <Input
          label="Contact Person Of Catalogue"
          type="text"
          name="ContactPersonOfCatalogue"
          placeholder="Enter Contact Person Of Catalogue here"
          value={value.ContactPersonOfCatalogue}
          onChange={(e) => updateValue(e)}
        />
        {errors.ContactPersonOfCatalogue && (
          <p style={{ color: 'red' }}>{errors.ContactPersonOfCatalogue}</p>
        )}
        <Input
          label="Contact Email"
          type="email"
          name="ContactEmail"
          placeholder="Enter Contact Email here"
          value={value.ContactEmail}
          onChange={(e) => updateValue(e)}
        />
        {errors.ContactEmail && (
          <p style={{ color: 'red' }}>{errors.ContactEmail}</p>
        )}
        <Input
          label="Contact Address"
          type="text"
          name="ContactAddress"
          placeholder="Enter Contact Address here"
          value={value.ContactAddress}
          onChange={(e) => updateValue(e)}
        />
        {errors.ContactAddress && (
          <p style={{ color: 'red' }}>{errors.ContactAddress}</p>
        )}
        <Input
          label="Contact Telephone"
          type="text"
          name="ContactTelephone"
          placeholder="Enter Contact Telephone here"
          value={value.ContactTelephone}
          onChange={(e) => updateValue(e)}
        />
        {errors.ContactTelephone && (
          <p style={{ color: 'red' }}>{errors.ContactTelephone}</p>
        )}
        <Input
          label="Contact Fax"
          type="text"
          name="ContactFax"
          placeholder="Enter Contact Fax here"
          value={value.ContactFax}
          onChange={(e) => updateValue(e)}
        />
        {errors.ContactFax && (
          <p style={{ color: 'red' }}>{errors.ContactFax}</p>
        )}
        <Input
          label="Number of Strains"
          type="text"
          name="NumberOfStrains"
          placeholder="Enter Number of Strains here"
          value={value.NumberOfStrains}
          onChange={(e) => updateValue(e)}
        />
        {errors.NumberOfStrains && (
          <p style={{ color: 'red' }}>{errors.NumberOfStrains}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step14;
