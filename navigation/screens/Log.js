// Component imports
import { View, Text, SafeAreaView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { app, auth, db, firebase } from '../../firebase.config'
import { collection, getDoc, deleteDoc } from 'firebase/firestore/lite'
import { QuerySnapshot, updateDoc } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import FontAwesome from 'react-native-vector-icons/Ionicons'
import Ionicones from 'react-native-vector-icons/Ionicons'

// Exported function
export default function Log({navigation}) {  

  // Initialise constants
  const [transList, setTransList] = useState([])
  const [selectionID, setSelectionID] = useState([])

  // User-specific data fetching, ordered from most recent entries
  const todoRef = firebase.firestore().collection('Logs').where('uid','==',getAuth().currentUser.uid).orderBy('trans_date', 'desc')
  var sign = ''

  // Use effect for fetching transaction log data
  useEffect( () => {
    async function fetchData(){
      todoRef
      .onSnapshot(
        querySnapshot => {
          const transList = []
          querySnapshot.forEach((doc) => {
            const { day, month, year, trans_date, trans_name, trans_amount, trans_type } = doc.data()
            
            // Add a negative sign to expenditure entries
            if(trans_type==='Expenditure'){
              sign = '-'
            } else {
              sign = ''
            }
            transList.push({

              // Formatting date, converting from Firestore TIMESTAMP to DD/MM/YYYY
              day: trans_date.toDate().getDate().toString().padStart(2, '0'),
              month: (trans_date.toDate().getMonth() + 1).toString().padStart(2, '0'),
              year: trans_date.toDate().getFullYear().toString().slice(-2),
              trans_date,
              trans_name,
              sign,
              trans_amount,
            })
          }) 
          setTransList(transList)
        }
      )
    }
    fetchData()
  }, [])

  function deleteEntry(selectedTransDate, selectedTransName, selectedTransAmount) {
    console.log(selectedTransDate, selectedTransName, selectedTransAmount);
  
    firebase
      .firestore()
      .collection("Logs")
      .where("uid", "==", getAuth().currentUser.uid)
      .where("trans_date", "==", selectedTransDate)
      .where("trans_name", "==", selectedTransName)
      .where("trans_amount", "==", selectedTransAmount)
      .get()
      .then((querySnapshot) => {
        const selectionIDs = [];
        querySnapshot.forEach((documentSnapshot) => {
          selectionIDs.push(documentSnapshot.id);
  
          // Deduce from goal balance, if associated with a goal
          if (documentSnapshot.data().trans_goal != null) {
            const goalName = documentSnapshot.data().trans_goal;
            const deductAmount = documentSnapshot.data().trans_amount;
            console.log(goalName, deductAmount);
  
            firebase
              .firestore()
              .collection("Goals")
              .where("uid", "==", getAuth().currentUser.uid)
              .where("goal_name", "==", goalName)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((documentSnapshot) => {
                  const goalDocRef = firebase.firestore().collection("Goals").doc(documentSnapshot.id);
                  const decrement = firebase.firestore.FieldValue.increment(-deductAmount);
                  const dataBalance = { goal_balance: decrement };
  
                  updateDoc(goalDocRef, dataBalance) // Use the updateDoc function
                    .then(() => {
                      console.log("Goal field has been updated with income association");
  
                      // Change goal met status if necessary
                      firebase
                        .firestore()
                        .collection("Goals")
                        .where("uid", "==", getAuth().currentUser.uid)
                        .where("goal_name", "==", goalName)
                        .get()
                        .then((querySnapshot) => {
                          querySnapshot.forEach((documentSnapshot) => {
                            if (documentSnapshot.data().goal_balance >= documentSnapshot.data().goal_amount) {
                              const dataComplete = { goal_complete: true };
                              updateDoc(goalDocRef, dataComplete); // Use the updateDoc function
                              console.log('Goal true');
                            } else {
                              const dataComplete = { goal_complete: false };
                              updateDoc(goalDocRef, dataComplete); // Use the updateDoc function
                              console.log('Goal false');
                            }
                          });
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
  
        if (selectionIDs.length === 0) {
          Alert.alert("No transactions found");
        }
  
        const batch = firebase.firestore().batch();
        selectionIDs.forEach((selectionID) => {
          const docRef = firebase.firestore().collection("Logs").doc(selectionID);
          batch.delete(docRef);
        });
  
        batch.commit()
          .then(() => {
            setSelectionID("");
          })
          .catch((error) => {
            console.log("Error removing documents: ", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  return (
    <SafeAreaView style={styles.background}>

        {/* New transaction button */}
        <Pressable style={styles.button} onPress={()=> navigation.navigate('New Transaction')}>
            <Text style={styles.buttonText}>NEW TRANSACTION</Text>
        </Pressable>

        {/* List of transactions */}
        <View style={styles.widget}>
          <FlatList
            data={transList}
            numColumns={1}
            renderItem={({item}) => (
              <View style={styles.entry}>
                
                {/* Formatting of entries */}
                <Text style={styles.textEntry}>Date: {item.day}/{item.month}/{item.year}{'\n'}Transaction: {item.trans_name}, {item.sign}${item.trans_amount}{'\n'}</Text>
                <Pressable style={styles.icon} onPress={() => deleteEntry(
                  item.trans_date
                  , item.trans_name
                  , item.trans_amount)}
                >
                  <Ionicones name='trash-bin' size={20} color='#682d01'/>
                </Pressable>
              </View>
            )}
          />
        </View>
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
  textEntry:{
    width: 280,
    fontWeight: '400'
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
  icon:{
    paddingVertical: 5,
  },
  entry:{
    flexDirection: 'row'
    , marginBottom: '5%'
    , backgroundColor: '#ffdeb7'
    , borderRadius: 10
    , padding: 15
    , paddingTop: 25
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