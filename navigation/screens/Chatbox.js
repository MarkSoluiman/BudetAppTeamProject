const { Touchable, TouchableOpacity } = require("react-native");
const { TextInput } = require("react-native-gesture-handler");

const configuration = new configuration ({
  apiKey: process.env.OPEN_API_KEY,

});

const openai = new OpenAIApi(configuration);

const Chatbox =() => {
  const [input,setInput] = useState('');
  const [output,setOutput] = useState('');

  const handleInput = async () => {
    try {
      const userInput = constPrompt + input
      const response = await openai.createCompletion({   // response const = openai  ...
        model: "text-davinci-003" ////openai completion method creates the code to the api and fetches the response for the user.
        prompt: 'You: ${userInput}\nAI:',
        temperature: 0,
        max_tokens: 60,
        top_p: 2.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],

      });
      setOutput(response.data.choices[0].text);  

    }catch (error)
    {
      console.log(error);
    }

    setInput('');
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}> Advice ChatBot</Text> // name of the chat container
      <View style={styles.chatContainer}>
           <View style={styles.inputContainer}>
              <TextInput
                 style={styles.input}
                 placeholder="Please enter your question!"
                 onChange={(text) => setInput(text)}
                 value={input}

                 />
                 <TouchableOpacity style={styles.sendButton} onPress={handleInput}>  /// handle input is used each time to send the question
                       <Text style={styles.sendButtonText}>Send</Text>
                 </TouchableOpacity>
                 <View style={styles.outputContainer}>
                      <Text style={styles.output}>{output}</Text>
                 </View>
           </View>        
      </View>
    </View>
  )
}