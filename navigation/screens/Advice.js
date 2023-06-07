// Component imports
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatBot from './ChatBot';

// Exported function
export default function Advice({ navigation }) {
  return (
    <View style={styles.container}>
      <ChatBot /> 
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdeb7',
  },
  widget: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#ff8100',
    borderWidth: 3,
    width: 370,
    padding: 15,
    backgroundColor: '#ffe9de',
    justifyContent: 'space-evenly',
  },
  footerWidget: {
    marginHorizontal: 20,
    marginBottom: 20,
    width: 370,
    padding: 15,
    justifyContent: 'space-evenly',
  },
});
