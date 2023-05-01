// Component imports
import { View, Text, SafeAreaView, ScrollView, FlatList, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import LogItem from "./logComponents/LogItem";
import LogInput from "./logComponents/LogInput";

// Exported function
export default function Log({navigation}) {
  const [userLogs, setUserLogs] = useState([]);

  // Add to log
  function addLogHandler(enteredLogText) {
    setUserLogs((currentUserLogs) => [
      ...currentUserLogs,
      { text: enteredLogText, key: Math.random.toString() },
    ]);
  }

  // Delete from log
  function deleteLogHandler(id){
    setUserLogs(currentUserLogs =>
      {
        return currentUserLogs.filter(
          (log)=>log.id !==id)
      })
  }
  
  return (
    <SafeAreaView style={styles.background}>

        {/* New goal button */}
        <Pressable style={styles.button} onPress={()=> navigation.navigate('New Transaction')}>
            <Text style={styles.buttonText}>NEW TRANSACTION</Text>
        </Pressable>

        {/* List of goals */}
        <ScrollView>
            <View style={styles.widget}>

            </View>
        </ScrollView>
    </SafeAreaView>
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
      marginHorizontal: 20
      , marginVertical: 20
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
