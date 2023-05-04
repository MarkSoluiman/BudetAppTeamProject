// Component imports
import { View, Text, SafeAreaView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Exported function
export default function Log({navigation}) {  

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if(user){
  //     const uid = user.uid
  //   }
  // })

  // const [loading, setLoading] = useState(true)
  // const [log, setLog] = useState([])

  // useEffect (() => {
  //   const subscriber = firestore()
  //     .collection('Logs')
  //     .where('uid', '==', uid)
  //     .orderBy('trans_date', 'desc')
  //     .get()
  //     .then(querySnapshot => {
  //       const log = [];
        
  //       querySnapshot.forEach(documentSnapshot => {
  //         log.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //         });
  //       });

  //       setLog(log)
  //       setLoading(false)
  //     })
  //   return () => subscriber();
  // }, [])

  // if (loading){
  //   return <ActivityIndicator/>
  // }

  return (
    <SafeAreaView style={styles.background}>

        {/* New transaction button */}
        <Pressable style={styles.button} onPress={()=> navigation.navigate('New Transaction')}>
            <Text style={styles.buttonText}>NEW TRANSACTION</Text>
        </Pressable>

        {/* List of transactions */}
          <View style={styles.widget}>
            {/* <FlatList
              data={log}
              renderItem={({item}) => (
                <View style={styles.list}>
                  <Text>Date: {item.trans_date}</Text>
                  <Text>Transaction: {item.trans_name}</Text>
                  <Text>Amount: ${item.trans_type}{item.trans_amount}</Text>
                </View>
              )}
            /> */}
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
