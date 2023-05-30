import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { OpenAIApi, configuration } from 'openai';

const Chatbox = () => {
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

export default Chatbox;
