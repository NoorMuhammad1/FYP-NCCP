import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../../../styles/global";
import { windowHeight, windowWidth } from "../../components/Dimensions";

// Form Check imports
import useSignInForm from "./SignInUseForm";
import SignInValidator from "./SignInValidator";
import globalColors from "../../../styles/globalColors";
import FormInput from "../../components/UI/FormInput";
import FormButton from "../../components/UI/FormButton";
import { login } from "../../actions/auth.actions";
import Toast from "../../helpers/Toast";
const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = () => {
    const { email, password } = signInValue;
    const user = {
      email,
      password,
      // token: recaptchaRef.current.getValue(),
    };
    dispatch(login(user));
  };

  const { signInValue, handleSignInSubmit, updateSignInValue, signInErrors } =
    useSignInForm(userLogin, SignInValidator);

  useEffect(() => {
    if (auth.token) {
      navigation.navigate("Dashboard");
    }
  }, [auth]);

  return (
    <View style={styles.container}>
      <Toast />
      <MaterialCommunityIcons
        name="virus"
        size={150}
        color={globalColors.SECONDARY_COLOR}
      />
      <Text style={styles.text}>NCCP</Text>

      <FormInput
        labelValue={signInValue.email}
        onChangeText={(value) => updateSignInValue(value, "email")}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        errorMessage={signInErrors.email}
      />
      <FormInput
        labelValue={signInValue.password}
        onChangeText={(value) => updateSignInValue(value, "password")}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
        errorMessage={signInErrors.password}
      />
      <FormButton
        buttonTitle="Sign In"
        // onPress={() => navigation.navigate("Dashboard")}
        onPress={handleSignInSubmit}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
});
