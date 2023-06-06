import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const ChatBot = () => {
  const [data, setData] = useState([]);
  const apiKey = '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'; // API Key
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
    setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text }]);
    setTextInput(''); // Clear the input text after receiving the response from the API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advice Bot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'orange' }}>
              {item.type === 'user' ? 'User' : 'Advice Bot'}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={text => setTextInput(text)}
        placeholder="Please enter your question"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  body: {
    backgroundColor: '#ffdeb7',
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff8100',
    width: '90%',
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ffdeb7',
    width: '90%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ff8100',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  bot: {
    marginLeft: 5,
  },
});

export default ChatBot;
