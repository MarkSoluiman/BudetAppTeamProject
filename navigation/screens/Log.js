import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Log({ navigation }) {
  return (
    <View style={styles.logContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.logInput} placeholder="Your Transaction" />
        <Pressable style={styles.button}>
          <Text>Add a Transaction</Text>
        </Pressable>
      </View>
      <View style={styles.transactionsContainer}>
        <Text>Transactions:</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logContainer: {
    flex:1,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#f7d69e",//
  },
  logButton: {},
  logInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
  inputContainer: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    marginBottom:14,
    borderBottomWidth:1,
    borderBottomColor:"gray",
    paddingBottom:14,
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
  transactionsContainer:{
    flex:9,
  }
});
