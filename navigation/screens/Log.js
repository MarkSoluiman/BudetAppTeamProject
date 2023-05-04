// Component imports
import { View, Text, SafeAreaView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { collection, getDocs } from '@firebase/firestore'





// Exported function


 export default function Log({navigation}) {  

  const logsCollectionRef=collection(db,"Logs")
  var expences=[]
  var earnings=[]
  var expencesFloat=[]
  var earningsFloat=[]
  const [logs,setLogs]=useState([])

const getTransactionsValues=async()=>{
 const data=await getDocs(logsCollectionRef)
 setLogs(data.docs.map((doc)=>({...doc.data(),id:doc.id})))

 logs.map((log)=>{
  console.log(log.trans_amount)
 })
}

 addToArrays=()=>{
  logs.map((log)=>{
    if(log.trans_type=="Expenditure"){
      expences.push(log.trans_amount)
    }else{
      earnings.push(log.trans_amount)
    }

   })

   expencesFloat=expences.map(function(str){
    return parseFloat(str)
   })
   earningsFloat=earnings.map(function(str){
    return parseFloat(str)
   })

   console.log(expencesFloat)
   console.log(earningsFloat)

}

 this.calcDifference=()=>{
  let income=0
  let expence=0
  earningsFloat.forEach(n =>income+=n)
  expencesFloat.forEach(n=> expence+=n)
  return(income-expence)
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

