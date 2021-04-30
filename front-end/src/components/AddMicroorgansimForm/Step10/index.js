import React                       from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Input                       from '../../UI/Input/input';
import StepTenValidator            from './StepTenValidator';
import useStepTenForm              from './useStepTenForm';

function Step10(props) {
  const handleSubmission = () => {
    props.next({
                 GrowthConditions: value,
               });
  };

  const { handleSubmit, value, updateValue, errors } = useStepTenForm(
    props.data,
    handleSubmission,
    StepTenValidator
  );
  return (
    <Container fluid>
      <h1>Growth Conditions</h1>
      <Form>
        <Input
          label="Conditions For Growth And Maintenence On Solid Media"
          type="text"
          name="ConditionsForGrowthAndMaintenenceOnSolidMedia"
          placeholder="Enter Conditions For Growth And Maintenence On Solid Media here"
          value={value.ConditionsForGrowthAndMaintenenceOnSolidMedia}
          onChange={(e) => updateValue(e)}
        />
        {errors.ConditionsForGrowthAndMaintenenceOnSolidMedia && (
          <p style={{ color: 'red' }}>
            {errors.ConditionsForGrowthAndMaintenenceOnSolidMedia}
          </p>
        )}
        <Input
          label="Conditions For Growth In Liquid Media"
          type="text"
          name="ConditionsForGrowthInLiquidMedia"
          placeholder="Enter Conditions For Growth In Liquid Media here"
          value={value.ConditionsForGrowthInLiquidMedia}
          onChange={(e) => updateValue(e)}
        />
        {errors.ConditionsForGrowthInLiquidMedia && (
          <p style={{ color: 'red' }}>
            {errors.ConditionsForGrowthInLiquidMedia}
          </p>
        )}
        <Input
          label="Conditions For Fruiting Or Sporulation"
          type="text"
          name="ConditionsForFruitingOrSporulation"
          placeholder="Enter Conditions For Fruiting Or Sporulation here"
          value={value.ConditionsForFruitingOrSporulation}
          onChange={(e) => updateValue(e)}
        />
        {errors.ConditionsForFruitingOrSporulation && (
          <p style={{ color: 'red' }}>
            {errors.ConditionsForFruitingOrSporulation}
          </p>
        )}
        <Input
          label="Conditions For Germination"
          type="text"
          name="ConditionsForGermination"
          placeholder="Enter Conditions For Germination here"
          value={value.ConditionsForGermination}
          onChange={(e) => updateValue(e)}
        />
        {errors.ConditionsForGermination && (
          <p style={{ color: 'red' }}>{errors.ConditionsForGermination}</p>
        )}
        <Input
          label="Carbon Sources Tested"
          type="text"
          name="CarbonSourcesTested"
          placeholder="Enter Carbon Sources Tested here"
          value={value.CarbonSourcesTested}
          onChange={(e) => updateValue(e)}
        />
        {errors.CarbonSourcesTested && (
          <p style={{ color: 'red' }}>{errors.CarbonSourcesTested}</p>
        )}
        <Input
          label="Nitrogen Sources Tested"
          type="text"
          name="NitrogenSourcesTested"
          placeholder="Enter Nitrogen Sources Tested here"
          value={value.NitrogenSourcesTested}
          onChange={(e) => updateValue(e)}
        />
        {errors.NitrogenSourcesTested && (
          <p style={{ color: 'red' }}>{errors.NitrogenSourcesTested}</p>
        )}
        <Input
          label="Single Compound Tested"
          type="text"
          name="SingleCompoundTested"
          placeholder="Enter Single Compound Tested here"
          value={value.SingleCompoundTested}
          onChange={(e) => updateValue(e)}
        />
        {errors.SingleCompoundTested && (
          <p style={{ color: 'red' }}>{errors.SingleCompoundTested}</p>
        )}
        <Input
          label="Nutritional Requirements"
          type="text"
          name="NutritionalRequirements"
          placeholder="Enter Nutritional Requirements here"
          value={value.NutritionalRequirements}
          onChange={(e) => updateValue(e)}
        />
        {errors.NutritionalRequirements && (
          <p style={{ color: 'red' }}>{errors.NutritionalRequirements}</p>
        )}
        <Input
          label="Defeciencies"
          type="text"
          name="Defeciencies"
          placeholder="Enter Defeciencies here"
          value={value.Defeciencies}
          onChange={(e) => updateValue(e)}
        />
        {errors.Defeciencies && (
          <p style={{ color: 'red' }}>{errors.Defeciencies}</p>
        )}
        <Input
          label="Tolerances And Sensitivities"
          type="text"
          name="TolerancesAndSensitivities"
          placeholder="Enter Tolerances And Sensitivities here"
          value={value.TolerancesAndSensitivities}
          onChange={(e) => updateValue(e)}
        />
        {errors.TolerancesAndSensitivities && (
          <p style={{ color: 'red' }}>{errors.TolerancesAndSensitivities}</p>
        )}
        <Input
          label="Temperature Relationships"
          type="text"
          name="TemperatureRelationships"
          placeholder="Enter Temperature Relationships here"
          value={value.TemperatureRelationships}
          onChange={(e) => updateValue(e)}
        />
        {errors.TemperatureRelationships && (
          <p style={{ color: 'red' }}>{errors.TemperatureRelationships}</p>
        )}
        <Input
          label="Maximum Growth PH"
          type="text"
          name="MaximumGrowthPH"
          placeholder="Enter Maximum Growth PH here"
          value={value.MaximumGrowthPH}
          onChange={(e) => updateValue(e)}
        />
        {errors.MaximumGrowthPH && (
          <p style={{ color: 'red' }}>{errors.MaximumGrowthPH}</p>
        )}
        <Input
          label="Minimum Growth PH"
          type="text"
          name="MinimumGrowthPH"
          placeholder="Enter Minimum Growth PH here"
          value={value.MinimumGrowthPH}
          onChange={(e) => updateValue(e)}
        />
        {errors.MinimumGrowthPH && (
          <p style={{ color: 'red' }}>{errors.MinimumGrowthPH}</p>
        )}
        <Input
          label="Optimal Growth PH"
          type="text"
          name="OptimalGrowthPH"
          placeholder="Enter Optimal Growth PH here"
          value={value.OptimalGrowthPH}
          onChange={(e) => updateValue(e)}
        />
        {errors.OptimalGrowthPH && (
          <p style={{ color: 'red' }}>{errors.OptimalGrowthPH}</p>
        )}
        <Input
          label="Light Conditions"
          type="text"
          name="LightConditions"
          placeholder="Enter Light Conditions here"
          value={value.LightConditions}
          onChange={(e) => updateValue(e)}
        />
        {errors.LightConditions && (
          <p style={{ color: 'red' }}>{errors.LightConditions}</p>
        )}
        <Input
          label="Oxygen Relationship"
          type="text"
          name="OxygenRelationship"
          placeholder="Enter Oxygen Relationship here"
          value={value.OxygenRelationship}
          onChange={(e) => updateValue(e)}
        />
        {errors.OxygenRelationship && (
          <p style={{ color: 'red' }}>{errors.OxygenRelationship}</p>
        )}
        <Input
          label="Heat Resistence"
          type="text"
          name="HeatResistence"
          placeholder="Enter Heat Resistence here"
          value={value.HeatResistence}
          onChange={(e) => updateValue(e)}
        />
        {errors.HeatResistence && (
          <p style={{ color: 'red' }}>{errors.HeatResistence}</p>
        )}
        <Input
          label="Ethanol Conditions"
          type="text"
          name="EthanolConditions"
          placeholder="Enter Ethanol Conditions here"
          value={value.EthanolConditions}
          onChange={(e) => updateValue(e)}
        />
        {errors.EthanolConditions && (
          <p style={{ color: 'red' }}>{errors.EthanolConditions}</p>
        )}
        <Input
          label="Salinity Requirements"
          type="text"
          name="SalinityRequirements"
          placeholder="Enter Salinity Requirements here"
          value={value.SalinityRequirements}
          onChange={(e) => updateValue(e)}
        />
        {errors.SalinityRequirements && (
          <p style={{ color: 'red' }}>{errors.SalinityRequirements}</p>
        )}
        <Input
          label="Optimal NaCl Concentration"
          type="text"
          name="OptimalNaClConcentration"
          placeholder="Enter Optimal NaCl Concentration here"
          value={value.OptimalNaClConcentration}
          onChange={(e) => updateValue(e)}
        />
        {errors.OptimalNaClConcentration && (
          <p style={{ color: 'red' }}>{errors.OptimalNaClConcentration}</p>
        )}
        <Input
          label="Minimum NaCl Concentration"
          type="text"
          name="MinimumNaClConcentration"
          placeholder="Enter Minimum NaCl Concentration here"
          value={value.MinimumNaClConcentration}
          onChange={(e) => updateValue(e)}
        />
        {errors.MinimumNaClConcentration && (
          <p style={{ color: 'red' }}>{errors.MinimumNaClConcentration}</p>
        )}
        <Input
          label="Maximum NaCl Cocentration"
          type="text"
          name="MaximumNaClCocentration"
          placeholder="Enter Maximum NaCl Cocentration here"
          value={value.MaximumNaClCocentration}
          onChange={(e) => updateValue(e)}
        />
        {errors.MaximumNaClCocentration && (
          <p style={{ color: 'red' }}>{errors.MaximumNaClCocentration}</p>
        )}
        <Input
          label="Optimum Sugar Concentration"
          type="text"
          name="OptimumSugarConcentration"
          placeholder="Enter Optimum Sugar Concentration here"
          value={value.OptimumSugarConcentration}
          onChange={(e) => updateValue(e)}
        />
        {errors.OptimumSugarConcentration && (
          <p style={{ color: 'red' }}>{errors.OptimumSugarConcentration}</p>
        )}
        <Input
          label="Minimum Sugar Concentration"
          type="text"
          name="MinimumSugarConcentration"
          placeholder="Enter Minimum Sugar Concentration here"
          value={value.MinimumSugarConcentration}
          onChange={(e) => updateValue(e)}
        />
        {errors.MinimumSugarConcentration && (
          <p style={{ color: 'red' }}>{errors.MinimumSugarConcentration}</p>
        )}
        <Input
          label="Maximum Sugar Concentration"
          type="text"
          name="MaximumSugarConcentration"
          placeholder="Enter Maximum Sugar Concentration here"
          value={value.MaximumSugarConcentration}
          onChange={(e) => updateValue(e)}
        />
        {errors.MaximumSugarConcentration && (
          <p style={{ color: 'red' }}>{errors.MaximumSugarConcentration}</p>
        )}
        <Input
          label="Osmophily And Xerophily"
          type="text"
          name="OsmophilyAndXerophily"
          placeholder="Enter Osmophily And Xerophily here"
          value={value.OsmophilyAndXerophily}
          onChange={(e) => updateValue(e)}
        />
        {errors.OsmophilyAndXerophily && (
          <p style={{ color: 'red' }}>{errors.OsmophilyAndXerophily}</p>
        )}
        <Input
          label="Water Activity Conditions"
          type="text"
          name="WaterActivityConditions"
          placeholder="Enter Water Activity Conditions here"
          value={value.WaterActivityConditions}
          onChange={(e) => updateValue(e)}
        />
        {errors.WaterActivityConditions && (
          <p style={{ color: 'red' }}>{errors.WaterActivityConditions}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step10;
