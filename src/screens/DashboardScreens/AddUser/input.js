import React, { PureComponent } from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  const _onChangeText = (text) => {
    props.onChangeValue(props.name, text);
  };
  const { onChangeValue, name, ...rest } = props;
  return (
    <TextInput style={styles.root} {...rest} onChangeText={_onChangeText} />
  );
};
// class Input extends PureComponent {
//   _onChangeText = (text) => {
//     this.props.onChangeValue(this.props.name, text);
//   };

//   render() {
//     const { onChangeValue, name, ...rest } = this.props;
//     return (
//       <TextInput
//         style={styles.root}
//         {...rest}
//         onChangeText={this._onChangeText}
//       />
//     );
//   }
// }

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f4f9f4",
    width: "90%",
    height: 45,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
});

export default Input;
