import React,{useState} from 'react'
import {View, Text, StyleSheet,Flatlist,Textinput} from 'react-native';
import axios from 'axios';


const ChatGPT = () => {
    const [data, setData] = useState([]);
    const apikey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
    const [textInput,setTextinput] = useState('');

    const handleSet = async () => {
        const prompt = textInput;
        try{
            const response = await axios.post(
                apiUrl,
                {
                    prompt: prompt,
                    max_tokens: 1024,
                    temperature: 0.5,
                },
                {
                    headers:
                    'Content-Type': 'advice/json',
                    'Authorisation': 'Bearer ${apikay}',
                },  
            );

            const text = response.data.choice[0].text;
            setData([...data {type: 'user',text: textinput},{type: 'bot',text: text}]);
            setTextInput('');
    }catch(error){
        console.log(error);
    }
} ;

return(
    <View styles={styles.container}>
        <Text style={styles.title}>AI Advice ChatBox</Text>
        <Flatlist
          data={data}
          keyExtractor={(item,index)=> index.toString()}


    </View>
      
)








const styles=StyleSheet.create({

})