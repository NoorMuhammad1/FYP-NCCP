import React, { PureComponent } from "react";
import { View, Button, StyleSheet } from "react-native";

const Step = (props) => {
  return (
    <View style={styles.root}>
      {props.children({
        onChange: props.onChange,
        values: props.values,
        errors: props.errors,
      })}
      <View style={styles.buttonWrapper}>
        <Button
          title="Prev"
          disabled={props.currentIndex === 0}
          onPress={props.prevStep}
        />
        {props.isLast ? (
          <Button title="Submit" onPress={props.onSubmit} />
        ) : (
          <Button title="Next" onPress={props.nextStep} />
        )}
      </View>
    </View>
  );
};
// class Step extends PureComponent {
//   state = {};
//   render() {
//     return (
//       <View style={styles.root}>
//         {this.props.children({
//           onChangeValue: this.props.onChangeValue,
//           values: this.props.values,
//         })}
//         <View style={styles.buttonWrapper}>
//           <Button
//             title="Prev"
//             disabled={this.props.currentIndex === 0}
//             onPress={this.props.prevStep}
//           />
//           {this.props.isLast ? (
//             <Button title="Submit" onPress={this.props.onSubmit} />
//           ) : (
//             <Button title="Next" onPress={this.props.nextStep} />
//           )}
//         </View>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Step;
