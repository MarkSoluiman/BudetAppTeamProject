import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import axios from 'axios';

const ChatGPT = () => {
    const [data, setData] = useState([]);
    const apikey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
    const [textInput, setTextInput] = useState('');

    const handleSend = async () => {
        const prompt = textInput;
        try {
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
                        'Authorization': `Bearer ${apikey}`,
                    },
                }
            );

            const text = response.data.choices[0].text;
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
                    onSubmitEditing={handleSend}
                />
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
        backgroundColor: '#fff',
    },
    bot: {
        flex: 1,
        paddingLeft: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
});

export default ChatGPT;
