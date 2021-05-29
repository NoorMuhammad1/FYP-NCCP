import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import FormButton from "../../../components/UI/FormButton";
import { Formik } from "formik";
import * as yup from "yup";
import FormInput from "../../../components/UI/FormInput";
import {
  AddMicroorganismFormData,
  initalMicroorganismData,
} from "../AddMicroorganism/AddMicroorganismFormData";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  addMicroorganism,
  fetchMicroorganismData,
  updateMicroorganismData,
} from "../../../actions/catalogue.actions";
import Loading from "../../../components/Loading";
import Toast from "../../../helpers/Toast";
import { authConstants } from "../../../actions";
const EditMicroorganism = (props) => {
  const id = props.route.params.id;
  const data = props.route.params.data;
  //   const [data, setData] = useState({});
  const dispatch = useDispatch();
  const updateMicroorganism = useSelector(
    (state) => state.catalogue.updateMicroorganism
  );

  //   useEffect(() => {
  //     dispatch(fetchMicroorganismData({ id }));
  //   }, []);

  //   useEffect(() => {
  //     setData(fetchMicroorganism.data);
  //   }, [fetchMicroorganism]);

  useEffect(() => {
    if (updateMicroorganism.fetched) {
      dispatch({ type: authConstants.UPDATE_MICROORGANISM_DETAILS_RESET });
      props.navigation.navigate("Catalogue");
    }
  }, [updateMicroorganism]);
  const handleSubmit = (values) => {
    console.log(id);
    dispatch(updateMicroorganismData({ data: values, id }));
  };
  return updateMicroorganism.fetching ? (
    <Loading>updating. Please wait...</Loading>
  ) : (
    //   return (
    <View>
      <Toast />
      <AddMicroorganismStepper initialValues={data} onSubmit={handleSubmit}>
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
                        labelValue={
                          values[step.id][element.id] !== null &&
                          values[step.id][element.id] !== undefined
                            ? values[step.id][element.id].toString()
                            : values[step.id][element.id]
                          //   Array.isArray(values[step.id][element.id])
                          //     ? values[step.id][element.id].toString()
                          //     : ""
                          //   typeof values[step.id][element.id] === "object" &&
                          //   values[step.id][element.id] !== null
                          //     ? values[step.id][element.id].toString()
                          //     : ""
                        }
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

export default EditMicroorganism;

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
                buttonTitle="Save"
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
