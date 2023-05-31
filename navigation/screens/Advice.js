

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
