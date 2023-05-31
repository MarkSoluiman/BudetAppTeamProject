import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatGPT from './navigation/screens/Chat.js';

export default function Advice() {
  return (
    <View style={styles.container}>
      <ChatGPT />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});