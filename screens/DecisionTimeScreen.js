import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DecisionTimeScreen = ({ onContinue }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.8}
      onPress={onContinue}
    >
      <View style={styles.content}>
        <Text style={styles.title}>It is decision time!</Text>
        <Text style={styles.subtitle}>Tap anywhere to continue</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ea',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default DecisionTimeScreen;
