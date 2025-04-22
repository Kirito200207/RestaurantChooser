import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CustomTextInput = ({
  label,
  labelStyle,
  maxLength,
  textInputStyle,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.fieldLabel, labelStyle]}>{label}</Text>
      <TextInput
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        style={[
          styles.textInput,
          textInputStyle,
          error ? styles.errorInput : {}
        ]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        {...props}
      />
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  maxLength: PropTypes.number,
  textInputStyle: PropTypes.object,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  }
});

export default CustomTextInput;