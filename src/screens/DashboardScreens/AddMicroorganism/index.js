import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import FormButton from "../../../components/UI/FormButton";
import { Formik } from "formik";
import * as yup from "yup";
import FormInput from "../../../components/UI/FormInput";
import {
  AddMicroorganismFormData,
  initalMicroorganismData,
} from "./AddMicroorganismFormData";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addMicroorganism } from "../../../actions/catalogue.actions";
const AddMicroorganism = (props) => {
  const dispatch = useDispatch();
  const MicroorganismAdd = useSelector(
    (state) => state.catalogue.addMicroorganism
  );
  const handleSubmit = (values) => {
    dispatch(addMicroorganism(values));
  };

  useEffect(() => {
    if (MicroorganismAdd.added) {
      props.navigation.navigate("Catalogue");
    }
  }, [MicroorganismAdd]);

  return (
    <View>
      <AddMicroorganismStepper
        initialValues={initalMicroorganismData}
        onSubmit={handleSubmit}
      >
        {AddMicroorganismFormData.map((step) => (
          <AddMicroorganismStep
            key={step.title}
            validationSchema={step.validationSchema}
          >
            {({ handleChange, values, touched, errors, handleBlur }) => (
              <>
                <Text
                  style={{
                    fontSize: 26,
                    alignSelf: "center",
                    marginVertical: 20,
                  }}
                >
                  {step.title}
                </Text>
                {step.elements.map(
                  (element) => (
                    <View key={element.id}>
                      <FormInput
                        name={`${step.id}.${element.id}`}
                        key={element.id}
                        labelValue={values[step.id][element.id]}
                        placeholderText={element.placeholder}
                        onChangeText={handleChange(`${step.id}.${element.id}`)}
                        keyboardType={
                          element.type == "number" ? "numeric" : null
                        }
                        onBlur={handleBlur(element.id)}
                        errorMessage={
                          errors[step.id] && errors[step.id][element.id]
                        }
                      />
                    </View>
                  ),
                  { errors }
                )}
              </>
            )}
          </AddMicroorganismStep>
        ))}
      </AddMicroorganismStepper>
    </View>
  );
};

export default AddMicroorganism;

const AddMicroorganismStep = (props) => {
  return (
    <>
      {props.children({
        handleChange: props.handleChange,
        values: props.values,
        touched: props.touched,
        errors: props.errors,
        handleBlur: props.handleBlur,
      })}
    </>
  );
};

const AddMicroorganismStepper = (props) => {
  const childrenArray = React.Children.toArray(props.children);
  const totalSteps = childrenArray.length;
  const [step, setStep] = useState(0);
  const _nextStep = () => setStep((s) => (s < totalSteps - 1 ? s + 1 : s));
  const _prevStep = () => setStep((s) => (s > 0 ? s - 1 : s));
  const isLastStep = () => step === totalSteps - 1;
  return (
    <Formik
      {...props}
      validationSchema={childrenArray[step].props.validationSchema}
      onSubmit={async (values, helpers) => {
        console.log("calling last step");

        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          _nextStep();
        }
      }}
    >
      {(formikProps) => (
        <ScrollView style={{ paddingHorizontal: 15, paddingTop: 10 }}>
          {React.cloneElement(childrenArray[step], {
            handleChange: formikProps.handleChange,
            values: formikProps.values,
            touched: formikProps.touched,
            errors: formikProps.errors,
            handleBlur: formikProps.handleBlur,
          })}
          <View
            style={{
              marginBottom: 50,
            }}
          >
            {step > 0 && <FormButton buttonTitle="Back" onPress={_prevStep} />}
            {isLastStep() ? (
              <FormButton
                buttonTitle="Submit"
                onPress={formikProps.handleSubmit}
              />
            ) : (
              <FormButton
                buttonTitle="Next"
                onPress={formikProps.handleSubmit}
              />
            )}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});
