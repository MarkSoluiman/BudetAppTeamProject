// Component imports
// Component imports
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { app, auth, db, firebase } from "../../firebase.config";
import { collection, getDoc, deleteDoc } from "firebase/firestore";
import { QuerySnapshot } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// Exported function
export default function HomeBalanceModal({ navigation }) {
  const [expences, setExpences] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [balance, setBalance] = useState();
  const expencesRef = firebase
    .firestore()
    .collection("Logs")
    .where("uid", "==", getAuth().currentUser.uid)
    .where("trans_type", "==", "Expenditure");
  const incomeRef = firebase
    .firestore()
    .collection("Logs")
    .where("uid", "==", getAuth().currentUser.uid)
    .where("trans_type", "==", "Income");
  useEffect(() => {
    async function fetchTransactionValues() {
      expencesRef.onSnapshot((QuerySnapshot) => {
        const expences = [];
        QuerySnapshot.forEach((doc) => {
          const trans_amount = doc.data();

          expences.push(trans_amount);
          
        });
        setExpences(expences.map(parseFloat))

      });

      incomeRef.onSnapshot((QuerySnapshot)=>{
        const incomes=[]
        QuerySnapshot.forEach((doc)=>{
            const trans_amount=doc.data()
            incomes.push(trans_amount)
        })
        setIncomes(incomes.map(parseFloat))
      })

      
      function calcBalance(){
        income=0
        expence=0
        incomes.forEach(i => income+=i)
        expences.forEach(e=> expences+=e)

        return(i-e)

      }

      setBalance(calcBalance)

      


      
      
    }
  });

  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Current Balance</Text>

      {/* Button to return to home page */}
      <Pressable onPress={() => navigation.navigate("Home")}>
        <View style={styles.button}>
          <Text style={styles.prompts}>GO BACK</Text>
        </View>
      </Pressable>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ffdeb7",
    padding: 20,
  },
  prompts: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    backgroundColor: "#ff8100",
    borderRadius: 25,
    paddingVertical: 10,
    height: 50,
    width: 90,
    margin: 20,
    alignSelf: "center",
  },
});
