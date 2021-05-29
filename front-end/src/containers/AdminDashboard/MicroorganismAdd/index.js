import {
  Button,
  CircularProgress,
  Grid,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@material-ui/core";
import SideBar from "components/SideBar";
import { addMicroorganism } from "../../../actions/catalogue.actions";
import React, { useEffect, useState } from "react";
import { initialFormData } from "./initialFormData";
import { LabelNameData } from "./LabelNameData";
import MicroorganismAddValidator from "./MicroorganismAddValidator";
import useFormMicroorganismAdd from "./useFormMicroorganismAdd";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { authConstants } from "actions";

// Stepper function and hooks
const getSteps = () => {
  return [
    "CoreDataSets",
    "Name",
    "StrainAdministration",
    "EnviromentAndHistory",
    "Publication",
    "BiologicalInteractions",
    "Sexuality",
    "Properties",
    "GrnotypeAndGenetics",
    "GrowthConditions",
    "ChemistryAndEnzymes",
    "Medium",
    "Sequence",
    "Catalogue",
  ];
};
const getStepContent = (label, value, errors, updateValue) => {
  // console.log("label is", value[label]);
  return (
    <Grid container xs lg md sm direction="column" spacing={2}>
      {value[label] &&
        Object.keys(value[label]).map((data, i) => (
          <Grid item xs lg md sm>
            <TextField
              label={LabelNameData[data]}
              fullWidth
              variant="outlined"
              name={data}
              value={value[label][data]}
              onChange={(e) => updateValue(e, label)}
              error={errors[label] && errors[label][data]}
              helperText={
                errors[label] && errors[label][data] ? errors[label][data] : ""
              }
            />
          </Grid>
        ))}
    </Grid>
  );
};
const AddMicroorganism = () => {
  const dispatch = useDispatch();
  const MicroorganismAdd = useSelector(
    (state) => state.catalogue.addMicroorganism
  );
  // Stepper logic
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();
  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const [label, setLabel] = useState("");
  const handleNext = (label) => {
    // handleSubmit();
    console.log(errors[label]);
    if (errors[label] == undefined) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completedSteps))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleMoveScreen = (label) => {
    handleSubmit();
    setLabel(label);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleStep = (step) => () => setActiveStep(step);
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // On submit handle
  const handleFormSubmission = () => {
    if (Object.keys(errors) == 0) {
      dispatch(addMicroorganism(value));
    } else {
      console.log("Still have some errors");
    }
  };

  // Form logic
  const { handleSubmit, value, updateValue, errors, setData } =
    useFormMicroorganismAdd(
      initialFormData,
      handleFormSubmission,
      MicroorganismAddValidator
    );
  useEffect(() => {
    if (label != "") {
      handleNext(label);
    }
  }, [errors]);
  // Spinner Function
  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">
          Microorganism Data is being added
        </h3>
        <CircularProgress className="fetch__data__spinner" />
      </div>
    );
  };

  const ErrorMessage = (message) => {
    return (
      <div className="error__div">
        <h3 className="error__title">{message}</h3>
      </div>
    );
  };

  if (MicroorganismAdd.adding) {
    return (
      <SideBar active="Catalogue">
        <div className="users__content__div">{requestSent()}</div>
      </SideBar>
    );
  }

  if (MicroorganismAdd.error.found) {
    return (
      <SideBar active="Catalogue">
        <div className="users__content__div">
          {ErrorMessage(MicroorganismAdd.error.message)}
        </div>
      </SideBar>
    );
  }
  if (MicroorganismAdd.added) {
    dispatch({ type: authConstants.ADD_MICROORGANISM_RESET });
    alert("returning to the main page");
    return <Redirect to="/adminDashboard/Microorganisms" />;
  }

  return (
    <SideBar active="Catalogue">
      <Grid
        contianer
        lg
        sm
        md
        xs
        style={{ minHeight: "90vh", overflow: "scroll" }}
      >
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{LabelNameData[label]}</StepLabel>
              <StepContent>
                {getStepContent(label, value, errors, updateValue)}
                <div style={{ margin: "1rem 0" }}>
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => handleMoveScreen(label)}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <Grid item xs lg md sm>
          {allStepsCompleted() ? (
            <div>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <div>content</div>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    `Step ${activeStep + 1} already completed`
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </SideBar>
  );
};

export default AddMicroorganism;
