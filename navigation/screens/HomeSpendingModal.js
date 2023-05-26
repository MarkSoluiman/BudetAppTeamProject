// Component imports
import { DocumentSnapshot, QuerySnapshot, query } from "@firebase/firestore";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { getAuth } from 'firebase/auth'
import { db, firebase } from '../../firebase.config'
import React, { useState, useEffect } from 'react'

// Exported functions
export default function HomeSpendingModal({ navigation }) {

  // Initialising constants

  // Screen width to ensure responsive design
  const screenWidth = Dimensions.get("window").width;

  // Spending category counts
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

  // Use state to find the total monthly spending - used to calculate the percentages in the legend
  const [calctotal, setCalcTotal] = useState(0);

  // Date constants - used to filter transactions to be in the current month
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const firstDayofMonth = new Date(currentDate.getFullYear(), currentMonth - 1, 1)
  const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentMonth, 1)


  // Function to query firestore - retreives expenditure records belonging to the user in the current month for a specified category
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

        // Initialise category spending count = 0
        let categoryCount = 0;

        // Add to category spending amount with each returned record
        querySnapshot.forEach(documentSnapshot => {
          categoryCount += parseInt(documentSnapshot.data().trans_amount);
        });

        // Return total category count
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
          
          const total = Object.values(updatedCounts).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
          setCalcTotal(total);
        })
        .catch(error => {
          console.error('Error fetching spending data:', error);
        });
    }
    fetchData();
  
    const interval = setInterval(() => {
      fetchData();
    }, 3000); // Update every 3 seconds
  
    return () => {
      clearInterval(interval);
    };
  }, []);
  

  // Initialise graph data and count (population)
  graphData = [
    {
      name: "Food",
      population: categoryCounts.Food,
      color: "#D73310",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Transport",
      population: categoryCounts.Transport,
      color: "#FB5734",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Health",
      population: categoryCounts.Health,
      color: "#A44B38",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Utilities",
      population: categoryCounts.Utilities,
      color: "#FFA10A",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Housing",
      population: categoryCounts.Housing,
      color: "#BD7B5C",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Entertainment",
      population: categoryCounts.Entertainment,
      color: "#FFC772",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Work",
      population: categoryCounts.Work,
      color: "#FFE572",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Schooling",
      population: categoryCounts.Schooling,
      color: "#FFF4C3",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Miscellaneous",
      population: categoryCounts.Miscellaneous,
      color: "#DFE823",
      legendFontColor: "black",
      legendFontSize: 15
    }
  ]

  // Chart configuration sets properties of monthly spending pie chart
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  // Return function
  return (
    <View style={styles.background}>
      <View style={styles.widget}>

        {/* Heading */}
        <Text style={styles.prompts}>Monthly Spending</Text>
    
        {/* Monthly spending pie chart */}
        <PieChart
          data={graphData}
          width={screenWidth}
          height={350}
          paddingLeft={screenWidth / 6.5}
          chartConfig={chartConfig}
          accessor="population"
          hasLegend={false}
        />

        {/* Legend */}
        <View style={styles.legendContainer}>
          {graphData.map((data, index) => (
            <View style={styles.legendItem} key={index}>

              {/* Data colour bullet point */}
              <View style={[styles.legendColor, { backgroundColor: data.color }]} />

              {/* Data label, value, and percentage */}
              <Text style={styles.legendLabel}>
                {data.name}, ${data.population} (
                {calctotal !== 0 ? ((data.population / calctotal) * 100).toFixed(2) : 0}
                %)
              </Text>
            </View>
          ))}
        </View>
    
        {/* Button to return to home page */}
        <Pressable onPress={() => navigation.navigate('Home')}>
          <View style={styles.button}>
            <Text style={styles.prompts}>GO BACK</Text>
          </View>
        </Pressable>
      </View>
    </View>
  ); 
}

// Styling
const styles = StyleSheet.create({

  // Page styling
  background: {
    flex: 1,
    backgroundColor: "#ffdeb7",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  widget:{
    marginHorizontal: 20
    , borderRadius: 10
    , borderColor: '#ff8100'
    , borderWidth: 3
    , width: 370
    , padding: 15
    , backgroundColor: '#ffe9de'
    , justifyContent: 'space-evenly'
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
    width: 110,
    margin: 20,
    alignSelf: "center",
  },

  // Legend styling
  legendContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginHorizontal: '15%'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendLabel: {
    fontSize: 15,
  },
})
