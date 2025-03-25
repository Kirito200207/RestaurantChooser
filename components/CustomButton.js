import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

class CustomButton extends Component {
  render() {
    const {
      text,
      onPress,
      buttonStyle,
      textStyle,
      width = "100%", 
      disabled = false,
    } = this.props;

    const backgroundColor = disabled ? "#CCCCCC" : "#007AFF"; 
    const handlePress = disabled ? () => {} : onPress; 

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.button,
          { width, backgroundColor },
          buttonStyle, 
        ]}
        disabled={disabled}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}


CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};


const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8, 
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;