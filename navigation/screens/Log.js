// Component imports
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import LogItem from "./logComponents/LogItem";
import LogInput from "./logComponents/LogInput";
import { db, app } from "../../firebase";

import {
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore/lite";
import { useEffect } from "react";

// Exported function
export default function Log() {
  const date = new Date();

  //to fetch every document as an array
  const [userLogs, setUserLogs] = useState([]);
  //to fetch a singular user log as an object
  //const [singleUserLog, setSingleUserLog] = useState({});
  const [logValue, setLogValue] = useState("");
  const [logDate, setLogDate] = useState("");
  const userLogsRef = collection(db, "Logs");

  //Read from firebase all of the logs
  // async function getLogs() {
  //   const logsCollection = collection(db, "Logs");
  //   const data = await getDocs(logsCollection);
  //   setUserLogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   // console.log(userLogs.map((user)=>{
  //   //   user.Description
  //   // }))
  //   console.log(
  //     userLogs.map((user) => {
  //       user.Description;
  //     })
  //   );
  // }

  // Add to log
  // function addLogHandler(enteredLogText) {
  //   setUserLogs((currentUserLogs) => [
  //     ...currentUserLogs,
  //     { text: enteredLogText, key: Math.random.toString() },
  //   ]);
  // }

  //reading from firebase:

  useEffect(() => {
    const getLogs = async () => {
      const data = await getDocs(userLogsRef);
      setUserLogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLogs();
  }, []);

  //add log to firebase:
  function createLog() {
    addDoc(collection(db, "Logs"), {
      Value: logValue,
      Date: logDate,
    });
  }

  //update log:
  function updateLog() {
    updateDoc(doc(db, "Logs", "log1"), {
      Value: logValue,
      Date: logDate,
    });
  }

  // Delete from log
  function deleteLogHandler(id) {
    setUserLogs((currentUserLogs) => {
      return currentUserLogs.filter((log) => log.id !== id);
    });
  }

  return (
    <View style={styles.logContainer}>
      <View>
        <TextInput
          value={logValue}
          onChangeText={(logValue) => {
            setLogValue(logValue);
          }}
          placeholder="logValue"
        ></TextInput>

        <TextInput
          value={logDate}
          onChangeText={(logDate) => {
            setLogDate(logDate);
          }}
          placeholder="Date"
        ></TextInput>

        <Pressable onPress={createLog}>
          <Text>Create</Text>
        </Pressable>
      </View>

      <View>
        <TextInput
          value={logValue}
          onChangeText={(logValue) => {
            setLogValue(logValue);
          }}
          placeholder="logValue"
        ></TextInput>

        <TextInput
          value={logDate}
          onChangeText={(logDate) => {
            setLogDate(logDate);
          }}
          placeholder="Date"
        ></TextInput>
        <Pressable onPress={updateLog}>
          <Text>update</Text>
        </Pressable>

        <View>
          <Text>
          {userLogs.map((userLog)=>{
            return(
              <Text>ID:{userLog.id}
              Description:{userLog.trans_name}
               Value:{userLog.trans_amount}
               Date:{userLog.trans_date.toString()}</Text>

            )
          }

          )}
          
          </Text>
        </View>
      </View>
      {/* <View>
        <Pressable onPress={getLogs}><Text>get logs</Text></Pressable>
      </View> */}
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  background:{
      flex:1
      , paddingTop: '5%'
      , backgroundColor: '#ffdeb7'
  },
  widget:{
      marginHorizontal: '5%'
      , marginVertical: '5%'
      , borderRadius: 15
      , width: 370
      , height: 605
      , padding: 15
      , backgroundColor: '#ff8100'
      , justifyContent: 'space-evenly'
  },
  button:{
      width: 370
      , height: 55
      , borderRadius: 30
      , marginHorizontal: 20
      , backgroundColor: '#bd5100'
      , justifyContent: 'center'
  },
  buttonText:{
      textAlign: 'center'
      , fontSize: 17
      , fontWeight: 'bold'
  }
})
