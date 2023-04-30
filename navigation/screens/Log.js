// Component imports
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import LogItem from "./logComponents/LogItem";
import LogInput from "./logComponents/LogInput";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore/lite";


// Exported function
export default function Log() {

 


  async function getLogs() {
    
    const logsCol = collection(db, "Logs");
    const logsSnapshot = await getDocs(logsCol);
    const logsList = logsSnapshot.docs.map((doc) => doc.data());
    console.log(logsList)
  }
  const [userLogs, setUserLogs] = useState([]);

  // Add to log
  function addLogHandler(enteredLogText) {
    setUserLogs((currentUserLogs) => [
      ...currentUserLogs,
      { text: enteredLogText, key: Math.random.toString() },
    ]);
  }

  // Delete from log
  function deleteLogHandler(id) {
    setUserLogs((currentUserLogs) => {
      return currentUserLogs.filter((log) => log.id !== id);
    });
  }

  return (
    
    <View style={styles.logContainer}>
      <LogInput onAddLog={addLogHandler} />
      <View style={styles.transactionsContainer}>
        <Pressable onPress={getLogs}><Text>hello</Text></Pressable>
        <FlatList
          data={userLogs}
          renderItem={(itemData) => {
            return (
              <LogItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteLogHandler}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  logContainer: {
    flex: 1,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7d69e", //white with a touch of orange
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
    width: "130%",
    marginRight: 10,
  },
});
