import React                       from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import TagInput                    from '../../TagInput';
import Input                       from '../../UI/Input/input';
import StepOneValidator            from './StepOneValidator';
import useStepOneForm              from './useStepOneForm';

function Step1(props) {
  const handleSubmission = () => {
    props.next({ CoreDataSets: value });
  };
  const { handleSubmit, value, updateValue, errors } = useStepOneForm(
    props.data,
    handleSubmission,
    StepOneValidator
  );

  return (
    <Container>
      <h2>Core Data Sets</h2>
      <Form>
        <Input
          label="Genus"
          type="text"
          name="Genus"
          placeholder="Enter Genus here"
          value={value.Genus}
          onChange={(e) => updateValue(e)}
        />
        {errors.Genus && <p style={{ color: 'red' }}>{errors.Genus}</p>}
        <Input
          label="AccessionNumber"
          type="text"
          name="AccessionNumber"
          placeholder="Enter Accession Number here"
          value={value.AccessionNumber}
          onChange={(e) => updateValue(e)}
        />
        {errors.AccessionNumber && (
          <p style={{ color: 'red' }}>{errors.AccessionNumber}</p>
        )}
        <TagInput
          label="Other Acession Numbers"
          name="OtherCollection"
          selected={(e) => updateValue(e)}
        />
        {errors.OtherCollection && (
          <p style={{ color: 'red' }}>{errors.OtherCollection}</p>
        )}
        <Input
          label="Species Epithet"
          type="text"
          name="SpeciesEpithet"
          placeholder="Enter Species Name Here"
          value={value.SpeciesEpithet}
          onChange={(e) => updateValue(e)}
        />
        {errors.SpeciesEpithet && (
          <p style={{ color: 'red' }}>{errors.SpeciesEpithet}</p>
        )}
        <Input
          label="Author"
          type="text"
          name="Author"
          placeholder="Enter Author Name Here"
          value={value.Author}
          onChange={(e) => updateValue(e)}
        />
        {errors.Author && <p style={{ color: 'red' }}>{errors.Author}</p>}
        <Form.Label>Organism Type</Form.Label>
        <Form.Control
          as="select"
          name="OrganismType"
          value={value.OrganismType}
          onChange={(e) => updateValue(e)}
        >
          <option>Bacteria</option>
          <option>Yeast</option>
          <option>Fungi</option>
          <option>Phage</option>
          <option>Algae</option>
          <option>MicroAlgae</option>
          <option>Virus</option>
          <option>Archaea</option>
          <option>Antibody</option>
        </Form.Control>
        {errors.OrganismType && (
          <p style={{ color: 'red' }}>{errors.OrganismType}</p>
        )}
        <Input
          label="History of Deposit"
          type="text"
          name="HistoryOfDeposit"
          placeholder="Enter History of Deposit Here"
          value={value.HistoryOfDeposit}
          onChange={(e) => updateValue(e)}
        />
        {errors.HistoryOfDeposit && (
          <p style={{ color: 'red' }}>{errors.HistoryOfDeposit}</p>
        )}
        <Input
          label="Date of Isolation"
          type="date"
          name="DateOfIsolation"
          placeholder="Enter Date of Isolation Here"
          value={value.DateOfIsolation}
          onChange={(e) => updateValue(e)}
        />
        {errors.DateOfIsolation && (
          <p style={{ color: 'red' }}>{errors.DateOfIsolation}</p>
        )}
        <Input
          label="Isolated From"
          type="text"
          name="IsolatedFrom"
          placeholder="Isolated From"
          value={value.IsolatedFrom}
          onChange={(e) => updateValue(e)}
        />
        {errors.IsolatedFrom && (
          <p style={{ color: 'red' }}>{errors.IsolatedFrom}</p>
        )}
        <Input
          label="Geographic Origin"
          type="text"
          name="GeographicOrigin"
          placeholder="Enter Geographic Origin Here"
          value={value.GeographicOrigin}
          onChange={(e) => updateValue(e)}
        />
        {errors.GeographicOrigin && (
          <p style={{ color: 'red' }}>{errors.GeographicOrigin}</p>
        )}
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={value.Status}
          name="Status"
          onChange={(e) => updateValue(e)}
        >
          <option>Type</option>
          <option>Non-Type</option>
        </Form.Control>
        {errors.Status && <p style={{ color: 'red' }}>{errors.Status}</p>}
        <Input
          label="Medium"
          type="text"
          name="Medium"
          placeholder="Enter Medium Here"
          value={value.Medium}
          onChange={(e) => updateValue(e)}
        />
        {errors.Medium && <p style={{ color: 'red' }}>{errors.Medium}</p>}
        <Input
          label="Optimum Growth Temperature"
          type="text"
          name="OptimumGrowthTemperature"
          placeholder="Enter Optimum Growth Temperature Here"
          value={value.OptimumGrowthTemperature}
          onChange={(e) => updateValue(e)}
        />
        {errors.OptimumGrowthTemperature && (
          <p style={{ color: 'red' }}>{errors.OptimumGrowthTemperature}</p>
        )}
        <Input
          label="Maximum Growth Temperature"
          type="text"
          name="MaximumGrowthTemperature"
          placeholder="Enter Maximum Growth Temperature Here"
          value={value.MaximumGrowthTemperature}
          onChange={(e) => updateValue(e)}
        />
        {errors.MaximumGrowthTemperature && (
          <p style={{ color: 'red' }}>{errors.MaximumGrowthTemperature}</p>
        )}
        <Input
          label="Minimum Growth Temperature"
          type="text"
          name="MinimumGrowthTemperature"
          placeholder="Enter Minimum Growth Temperature Here"
          value={value.MinimumGrowthTemperature}
          onChange={(e) => updateValue(e)}
        />
        {errors.MinimumGrowthTemperature && (
          <p style={{ color: 'red' }}>{errors.MinimumGrowthTemperature}</p>
        )}
        <Button onClick={(e) => handleSubmit(e)}>Next</Button>
      </Form>
    </Container>
  );
}

export default Step1;
