import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

export default function Log() {
  const [enteredLogText, setEnteredLogText] = useState("");
  const [userLogs, setUserLogs] = useState([]);

  function logInputHandler(enteredLog) {
    setEnteredLogText(enteredLog);
  }

  function addLogHandler() {
    setUserLogs((currentUserLogs) => {
      [...currentUserLogs, enteredLogText];
    });
  }
  return (
    <View style={styles.logContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.logInput}
          placeholder="Your Transaction"
          onChangeText={logInputHandler}
        />
        <Pressable style={styles.button} onPress={addLogHandler}>
          <Text>Add a Transaction</Text>
        </Pressable>
      </View>
      <View style={styles.transactionsContainer}>
        {userLogs.map((log) => 
          <Text>{log}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logContainer: {
    flex: 1,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7d69e", //white with a touch of orange
  },
 
  logInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
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

  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  transactionsContainer: {
    flex: 6,
  },
});
