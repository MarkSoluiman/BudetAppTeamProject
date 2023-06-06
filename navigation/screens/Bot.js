import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ChatBot = () => {
  const [data, setData] = useState([]);
  const apiKey = ''; // API Key
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'; // URL to OpenAI
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, // API key for verification
        },
      }
    );
    const text = response.data.choices[0].text;
    setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]);
    setTextInput(''); // Clear the input text after receiving the response from the API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advice ChatBot</Text>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffdeb7',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 20,
  },
});
