// Component imports
import { View, Text, SafeAreaView, FlatList, StyleSheet, Pressable, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { app, auth, db, firebase } from '../../firebase.config'
import { collection, getDoc, deleteDoc } from 'firebase/firestore/lite'
import { QuerySnapshot, updateDoc } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
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

  // Delete function called when user presses the trash bin icon next to an entry
  function deleteEntry(selectedTransDate, selectedTransName, selectedTransAmount) {

    // Query to find the selected entry
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
  
          // Deduce transaction amount from goal balance, if associated with a goal
          if (documentSnapshot.data().trans_goal != null) {
            const goalName = documentSnapshot.data().trans_goal;
            const deductAmount = documentSnapshot.data().trans_amount;
  
            // Query to find user goal with matching name
            firebase
              .firestore()
              .collection("Goals")
              .where("uid", "==", getAuth().currentUser.uid)
              .where("goal_name", "==", goalName)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((documentSnapshot) => {

                  // Decrement amount from goal balance
                  const goalDocRef = firebase.firestore().collection("Goals").doc(documentSnapshot.id);
                  const decrement = firebase.firestore.FieldValue.increment(-deductAmount);
                  const dataBalance = { goal_balance: decrement };
                  updateDoc(goalDocRef, dataBalance) 
                    .then(() => {
                      console.log("Goal field has been updated with income association");
  
                      // Change goal met status if necessary
                      // Query to find same goal with new balance amouunt 
                      firebase
                        .firestore()
                        .collection("Goals")
                        .where("uid", "==", getAuth().currentUser.uid)
                        .where("goal_name", "==", goalName)
                        .get()
                        .then((querySnapshot) => {
                          querySnapshot.forEach((documentSnapshot) => {

                            // If balance is greater than or equal to the user set amount
                            if (documentSnapshot.data().goal_balance >= documentSnapshot.data().goal_amount) {

                              // Set goal completion status to true
                              const dataComplete = { goal_complete: true };
                              updateDoc(goalDocRef, dataComplete); 

                            // If balance is less than the user set amount
                            } else {

                              // Set goal completion status to false
                              const dataComplete = { goal_complete: false };
                              updateDoc(goalDocRef, dataComplete); 
                            }
                          });
                        })

                        // Catches for errors
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
  
        // Delete log
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

          // Catches for errors
          .catch((error) => {
            console.log("Error removing documents: ", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  // Returned function
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
                
                {/* Trash icon to delete an entry */}
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

  // Page styling
  background:{
      flex:1
      , paddingTop: '5%'
      , backgroundColor: '#ffdeb7'
  },
  widget:{
      marginVertical: '5%'
      , borderRadius: 15
      , width: Dimensions.get('window').width-40
      , height: Dimensions.get('window').height-260
      , padding: 15
      , backgroundColor: '#ff8100'
      , justifyContent: 'space-evenly'
      , alignSelf: 'center'
  },

  // Entry styling
  icon:{
    paddingTop: 10,
    paddingRight: 10,
},
entry:{
    flexDirection: 'row'
    , marginBottom: '5%'
    , backgroundColor: '#ffdeb7'
    , borderRadius: 10
    , padding: 15
    , paddingTop: 25
    , width: Dimensions.get('window').width-70
    , alignSelf: 'center'
    , justifyContent: 'space-between'
},
textEntry:{
    fontWeight: '400'
},

  // Button styling
  button:{
      width: Dimensions.get('window').width-40
      , height: Dimensions.get('window').height-810
      , borderRadius: 30
      , backgroundColor: '#bd5100'
      , justifyContent: 'center'
      , alignSelf: 'center'
  },
  buttonText:{
      textAlign: 'center'
      , fontSize: 17
      , fontWeight: 'bold'
  }
})