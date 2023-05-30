import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { OpenAIApi } from 'openai';

const ChatGPT = () => {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    const prompt = textInput;
    try {
      const apikey = process.env.OPENAI_API_KEY;
      const openaiInstance = new OpenAIApi(apikey);

      const response = await openaiInstance.complete({
        engine: 'text-davinci-003',
        prompt: prompt,
        maxTokens: 1024,
        temperature: 0.5,
      });

      const text = response.choices[0].text;
      setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text }]);
      setTextInput('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Advice ChatBox</Text>
      <View style={styles.chatContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          style={styles.body}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text style={{ fontWeight: '600', color: item.type === 'user' ? 'green' : 'red' }}>
                {item.type === 'user' ? 'User' : 'Bot'}
              </Text>
              <Text style={styles.bot}>{item.text}</Text>
            </View>
          )}
        />
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder="Ask me for advice"
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  body: {
    backgroundColor: '#ffdeb7',
  },
  bot: {
    flex: 1,
    paddingLeft: 10,
  },
  input: {
    height: 40,
    borderColor: '#ffdeb7',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'orange',
    width: '90%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default ChatGPT;