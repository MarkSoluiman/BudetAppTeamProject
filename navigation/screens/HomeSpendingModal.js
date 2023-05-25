// Component imports
import { DocumentSnapshot, QuerySnapshot, query } from "@firebase/firestore";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { getAuth } from 'firebase/auth'
import { db, firebase } from '../../firebase.config'
import React, { useState, useEffect } from 'react'

// HELP https://blog.logrocket.com/using-react-native-chart-kit-visualize-data/ 

// Exported functions
export default function HomeSpendingModal({ navigation }) {

  const [categoryCounts, setCategoryCounts] = useState({
    Food: 0,
    Transport: 0,
    Health: 0,
    Utilities: 0,
    Housing: 0,
    Entertainment: 0,
    Work: 0,
    Schooling: 0,
    Miscellaneous: 0
  });

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const firstDayofMonth = new Date(currentDate.getFullYear(), currentMonth - 1, 1)
  const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentMonth, 1)

  function setCount(category) {
    return firebase.firestore()
      .collection("Logs")
      .where('uid', '==', getAuth().currentUser.uid)
      .where('trans_type', '==', 'Expenditure')
      .where('trans_date', '>=', firstDayofMonth)
      .where('trans_date', '<', firstDayOfNextMonth)
      .where('trans_category', '==', category)
      .get()
      .then(querySnapshot => {
        let categoryCount = 0;
        querySnapshot.forEach(documentSnapshot => {
          categoryCount += parseInt(documentSnapshot.data().trans_amount);
        });
        return categoryCount;
      });
  }

  // Use effect for fetching spending data
useEffect(() => {
    async function fetchData() {
      const promises = Object.keys(categoryCounts).map(category => {
        return setCount(category)
          .then(categoryCount => ({ category, categoryCount }));
      });

      Promise.all(promises)
        .then(results => {
          const updatedCounts = {};
          results.forEach(({ category, categoryCount }) => {
            updatedCounts[category] = categoryCount;
          });
          setCategoryCounts(updatedCounts);
        })
        .catch(error => {
          console.error('Error fetching spending data:', error);
        });
    }

    fetchData();
  }, []);


  graphData = [
    {
      name: "Food",
      population: categoryCounts.Food,
      color: "#D73310",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Transport",
      population: categoryCounts.Transport,
      color: "#FB5734",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Health",
      population: categoryCounts.Health,
      color: "#A44B38",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Utilities",
      population: categoryCounts.Utilities,
      color: "#FFA10A",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Housing",
      population: categoryCounts.Housing,
      color: "#BD7B5C",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Entertainment",
      population: categoryCounts.Entertainment,
      color: "#FFC772",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Work",
      population: categoryCounts.Work,
      color: "#FFE572",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Schooling",
      population: categoryCounts.Schooling,
      color: "#FFF4C3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Miscellaneous",
      population: categoryCounts.Miscellaneous,
      color: "#DFE823",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]

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
          data={graphData}
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
      <Text>{categoryCounts.Housing}</Text>

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
