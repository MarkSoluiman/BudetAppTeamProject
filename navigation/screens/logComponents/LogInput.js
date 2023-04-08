import { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
function LogInput(props) {
  const [enteredLogText, setEnteredLogText] = useState("");

  function logInputHandler(enteredLog) {
    setEnteredLogText(enteredLog);
  }

  function addLogHandler() {
    props.onAddLog(enteredLogText);
    setEnteredLogText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.logInput}
        placeholder="Your Transaction"
        onChangeText={logInputHandler}
        value={enteredLogText}
      />
      <Pressable style={styles.button} onPress={addLogHandler}>
        <Text>Add a Transaction</Text>
      </Pressable>
    </View>
  );
}

export default LogInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 14,
  },
  button: {
    borderRadius: 4,
    padding: 5,
    fontSize: 24,
    backgroundColor: "orange",
  },
  logInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
});
