// Component imports
import { DocumentSnapshot, QuerySnapshot, query } from "@firebase/firestore";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { getAuth } from 'firebase/auth'
import { db, firebase } from '../../firebase.config'
import React, { useState, useEffect } from 'react'
import { reduceEachLeadingCommentRange } from "typescript";

// HELP https://blog.logrocket.com/using-react-native-chart-kit-visualize-data/ 

// Exported functions
export default function HomeSpendingModal({ navigation }) {


  let [foodCount, transportCount, healthCount, utilitiesCount, housingCount, enterCount, workCount, schoolCount, miscCount] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const [data, setData] = useState([])

  function getCurrentMonth(){
    currentDate = new Date()
    return currentDate.getMonth()
  }

  function getCurrentYear(){
    currentDate = new Date()
    return currentDate.getYear()
  }

  function setCount(category, categoryCount){
    firebase.firestore().collection("Logs")
      .where('uid', '==', getAuth().currentUser.uid)
      .where('trans_type', '==', 'Expenditure')
      // .where('trans_date', '>=', new Date()) // month
      .where('trans_category', '==', category) // category
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          categoryCount += parseInt(documentSnapshot.data().trans_amount)
          console.log(category, ': ', categoryCount)
        })
      })
  }

  // Use effect for fetching spending data
  useEffect( () => {
    async function fetchData(){
      console.log('Year: ', getCurrentYear())
      console.log('Month: ', getCurrentMonth())
      setCount('Food', foodCount)
      setCount('Transport', transportCount)
      setCount('Health', healthCount)
      setCount('Utilities', utilitiesCount)
      setCount('Housing', housingCount)
      setCount('Entertainment', enterCount)
      setCount('Work', workCount)
      setCount('Schooling', schoolCount)
      setCount('Miscellaneous', miscCount)
    }
    fetchData()

      setData([
        {
          name: "Food",
          population: foodCount,
          color: "#D73310",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Transport",
          population: transportCount,
          color: "#FB5734",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Health",
          population: healthCount,
          color: "#A44B38",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Utilities",
          population: utilitiesCount,
          color: "#FFA10A",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Housing",
          population: housingCount,
          color: "#BD7B5C",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Entertainment",
          population: enterCount,
          color: "#FFC772",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Work",
          population: workCount,
          color: "#FFE572",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Schooling",
          population: schoolCount,
          color: "#FFF4C3",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Miscellaneous",
          population: miscCount,
          color: "#DFE823",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ])

  }, [])

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  

  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Monthly Spending</Text>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <PieChart
          data={data}
          width={screenWidth-30}
          height={300}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"10"}
          center={[10,10]}
          absolute
        />
      </View>
      <Text>{foodCount}</Text>

      {/* Button to return to home page */}
      <Pressable onPress={() => navigation.navigate("Home")}>
        <View style={styles.button}>
          <Text style={styles.prompts}>GO BACK</Text>
        </View>
      </Pressable>
    </View>
  )
}

// Styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ffe9df",
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
  }
})
