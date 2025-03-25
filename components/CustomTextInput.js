import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";


const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8, 
  },
  label: {
    marginLeft: 10,
    marginBottom: 4,
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    width: "96%",
    marginLeft: "2%", 
    paddingHorizontal: 10,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: "#c0c0c0",
        borderRadius: 8,
      },
      android: {
        borderBottomWidth: 1,
        borderColor: "#c0c0c0",
      },
    }),
  },
});

class CustomTextInput extends Component {
  render() {
    const {
      label,
      labelStyle,
      maxLength = 50,
      textInputStyle,
      value,
      onChangeText,
      placeholder,
    } = this.props;

    return (
      <View style={styles.container}>
        {/* 输入框标签 */}
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {/* 文本输入框 */}
        <TextInput
          style={[styles.input, textInputStyle]}
          maxLength={maxLength}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
      </View>
    );
  }
}


CustomTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object, 
  maxLength: PropTypes.number, 
  textInputStyle: PropTypes.object, 
  value: PropTypes.string.isRequired, 
  onChangeText: PropTypes.func.isRequired, 
  placeholder: PropTypes.string, 
};

export default CustomTextInput;