import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../UI/Input/input";
import StepNineValidator from "./StepNineValidator";
import useStepNineForm from "./useStepNineForm";

function Step9(props) {
  const handleSubmission = () => {
    props.next({
      GenotypeAndGenetics: value,
    });
  };

  const { handleSubmit, value, updateValue, errors } = useStepNineForm(
    props.data,
    handleSubmission,
    StepNineValidator
  );
  return (
    <Container fluid>
      <h1>Genotype And Genetics</h1>
      <Form>
        <Input
          label="Genotype"
          type="text"
          name="Genotype"
          placeholder="Enter Genotype here"
          value={value.Genotype}
          onChange={(e) => updateValue(e)}
        />
        {errors.Genotype && <p style={{ color: "red" }}>{errors.Genotype}</p>}
        <Input
          label="Phenotype"
          type="text"
          name="Phenotype"
          placeholder="Enter Phenotype here"
          value={value.Phenotype}
          onChange={(e) => updateValue(e)}
        />
        {errors.Phenotype && <p style={{ color: "red" }}>{errors.Phenotype}</p>}
        <Input
          label="MatingType"
          type="text"
          name="MatingType"
          placeholder="Enter MatingType here"
          value={value.MatingType}
          onChange={(e) => updateValue(e)}
        />
        {errors.MatingType && (
          <p style={{ color: "red" }}>{errors.MatingType}</p>
        )}
        <Input
          label="Sexual Reproduction"
          type="text"
          name="SexualReproduction"
          placeholder="Enter Sexual Reproduction here"
          value={value.SexualReproduction}
          onChange={(e) => updateValue(e)}
        />
        {errors.SexualReproduction && (
          <p style={{ color: "red" }}>{errors.SexualReproduction}</p>
        )}
        <Input
          label="GC Content of DNA"
          type="text"
          name="GCContentOfDNA"
          placeholder="Enter GC Content of DNA here"
          value={value.GCContentOfDNA}
          onChange={(e) => updateValue(e)}
        />
        {errors.GCContentOfDNA && (
          <p style={{ color: "red" }}>{errors.GCContentOfDNA}</p>
        )}
        <Input
          label="Other Strains Hybridization"
          type="text"
          name="OtherStrainsHybridization"
          placeholder="Enter Other Strains Hybridization here"
          value={value.OtherStrainsHybridization}
          onChange={(e) => updateValue(e)}
        />
        {errors.OtherStrainsHybridization && (
          <p style={{ color: "red" }}>{errors.OtherStrainsHybridization}</p>
        )}
        <Input
          label="Hybridization Strain Number"
          type="text"
          name="HybridizationStrainNumber"
          placeholder="Enter Hybridization Strain Number here"
          value={value.HybridizationStrainNumber}
          onChange={(e) => updateValue(e)}
        />
        {errors.HybridizationStrainNumber && (
          <p style={{ color: "red" }}>{errors.HybridizationStrainNumber}</p>
        )}
        <Input
          label="Type of DNA or RNA"
          type="text"
          name="TypeOfDNAOrRNA"
          placeholder="Enter Type of DNA or RNA here"
          value={value.TypeOfDNAOrRNA}
          onChange={(e) => updateValue(e)}
        />
        {errors.TypeOfDNAOrRNA && (
          <p style={{ color: "red" }}>{errors.TypeOfDNAOrRNA}</p>
        )}
        <Input
          label="Percentage"
          type="text"
          name="Percentage"
          placeholder="Enter Percentage here"
          value={value.Percentage}
          onChange={(e) => updateValue(e)}
        />
        {errors.Percentage && (
          <p style={{ color: "red" }}>{errors.Percentage}</p>
        )}
        <Input
          label="Temperature of Hybridization"
          type="text"
          name="TemperatureOfHybridization"
          placeholder="Enter Temperature of Hybridization here"
          value={value.TemperatureOfHybridization}
          onChange={(e) => updateValue(e)}
        />
        {errors.TemperatureOfHybridization && (
          <p style={{ color: "red" }}>{errors.TemperatureOfHybridization}</p>
        )}
        <Input
          label="Mutants"
          type="text"
          name="Mutants"
          placeholder="Enter Mutants here"
          value={value.Mutants}
          onChange={(e) => updateValue(e)}
        />
        {errors.Mutants && <p style={{ color: "red" }}>{errors.Mutants}</p>}
        <Input
          label="Mutation Methods"
          type="text"
          name="MutationMethods"
          placeholder="Enter Mutation Methods here"
          value={value.MutationMethods}
          onChange={(e) => updateValue(e)}
        />
        {errors.MutationMethods && (
          <p style={{ color: "red" }}>{errors.MutationMethods}</p>
        )}
        <Input
          label="Hybrids"
          type="text"
          name="Hybrids"
          placeholder="Enter Hybrids here"
          value={value.Hybrids}
          onChange={(e) => updateValue(e)}
        />
        {errors.Hybrids && <p style={{ color: "red" }}>{errors.Hybrids}</p>}
        <Input
          label="Plasmid"
          type="text"
          name="Plasmid"
          placeholder="Enter Plasmid here"
          value={value.Plasmid}
          onChange={(e) => updateValue(e)}
        />
        {errors.Plasmid && <p style={{ color: "red" }}>{errors.Plasmid}</p>}
        <Input
          label="Killer Properties Of Yeast"
          type="text"
          name="KillerPropertiesOfYeast"
          placeholder="Enter Killer Properties of Yeast here"
          value={value.KillerPropertiesOfYeast}
          onChange={(e) => updateValue(e)}
        />
        {errors.KillerPropertiesOfYeast && (
          <p style={{ color: "red" }}>{errors.KillerPropertiesOfYeast}</p>
        )}
      </Form>
      <Button onClick={() => props.prev()}>Back</Button>
      <Button onClick={(e) => handleSubmit(e)}>Next</Button>
    </Container>
  );
}

export default Step9;
