// Component imports
import { TouchableOpacity, View, Text, SafeAreaView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { app, auth, db, firebase } from '../../firebase.config'
import { collection, getDoc, deleteDoc } from 'firebase/firestore'
import { QuerySnapshot } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'

// Exported function

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

  function deleteEntry(selectedTransDate, selectedTransName, selectedTransAmount){
    firebase.firestore()
      .collection('Logs')
      .where('uid', '==', getAuth().currentUser.uid)
      .where('trans_date', '==', selectedTransDate)
      .where('trans_name', '==', selectedTransName)
      .where('trans_amount', '==', selectedTransAmount)
      .get()
    .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
            setSelectionID(documentSnapshot.id)
        })
    })
    .catch(error => {
        console.error(error)
    })
    firebase.firestore()
      .collection('Logs')
      .doc(selectionID).delete()
    setSelectionID(0)
  }

  return (
    <SafeAreaView style={styles.background}>

        {/* New transaction button */}
        <Pressable style={styles.button} onPress={()=> navigation.navigate('New Transaction')}>
            <Text style={styles.buttonText}>NEW TRANSACTION</Text>
        </Pressable>
        <Pressable onPress={getTransactionsValues}>
          <Text>get data</Text>
        </Pressable>
        <Pressable onPress={addToArrays}>
          <Text> add to arrays</Text>
        </Pressable>
        <Pressable onPress={calcDifference}>
          <Text>calculate difference </Text>
        </Pressable>




        {/* List of transactions */}
        <View style={styles.widget}>
          <FlatList
            data={transList}
            numColumns={1}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => deleteEntry(
                  item.trans_date
                  , item.trans_name
                  , item.trans_amount)}
              >
                <View>
                  
                  {/* Formatting of entries */}
                  <Text>{item.day}/{item.month}/{item.year}{'\n'}{item.trans_name}, {item.sign}${item.trans_amount}{'\n'}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
    </SafeAreaView>
  );

  


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

