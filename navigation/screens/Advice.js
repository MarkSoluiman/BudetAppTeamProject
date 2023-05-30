import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

const Advice = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInput = async () => {
    try {
      const userInput = `You: ${input}\nAI:`;
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: userInput,
        temperature: 0,
        max_tokens: 60,
        top_p: 2.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ['You:'],
      });
      setOutput(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }

    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advice ChatBot</Text>
      <View style={styles.chatContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Please enter your question!"
            onChangeText={(text) => setInput(text)}
            value={input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={styles.output}>{output}</Text>
        </View>
      </View>
    </View>
  );
};

export default Advice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatContainer: {
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  outputContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
  },
  output: {
    fontSize: 16,
  },
  background: {
    flex: 1,
    paddingTop: 20,
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
