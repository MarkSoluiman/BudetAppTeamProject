import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { firebase } from "../../firebase.config";
import { PieChart } from "react-native-chart-kit";

export default function HomeBalanceModal({ navigation }) {
  const screenWidth = Dimensions.get("window").width;

  const [categoryCounts, setCategoryCounts] = useState({
    Income: 0,
    Expenditure: 0,
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentMonth - 1,
    1
  );
  const firstDayOfNextMonth = new Date(
    currentDate.getFullYear(),
    currentMonth,
    1
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeQuerySnapshot = await firebase
          .firestore()
          .collection("Logs")
          .where("uid", "==", firebase.auth().currentUser.uid)
          .where("trans_type", "==", "Income")
          .where("trans_date", ">=", firstDayOfMonth)
          .where("trans_date", "<", firstDayOfNextMonth)
          .get();

        const expenditureQuerySnapshot = await firebase
          .firestore()
          .collection("Logs")
          .where("uid", "==", firebase.auth().currentUser.uid)
          .where("trans_type", "==", "Expenditure")
          .where("trans_date", ">=", firstDayOfMonth)
          .where("trans_date", "<", firstDayOfNextMonth)
          .get();

        let totalIncome = 0;
        incomeQuerySnapshot.forEach((documentSnapshot) => {
          const transAmount = documentSnapshot.data().trans_amount;
          totalIncome += parseInt(transAmount);
        });

        let totalExpenditure = 0;
        expenditureQuerySnapshot.forEach((documentSnapshot) => {
          const transAmount = documentSnapshot.data().trans_amount;
          totalExpenditure += parseInt(transAmount);
        });
     

        setCategoryCounts({
          Income: totalIncome,
          Expenditure: totalExpenditure,
        });
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000); // Update every 3 seconds
  
    return () => {
      clearInterval(interval);
    };

   
  }, []);


  graphData = [
    {
      name: "Income",
      population: categoryCounts.Income,
      color: "#DFE823",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Expenditure",
      population: categoryCounts.Expenditure,
      color: "#FFE572",
      legendFontColor: "black",
      legendFontSize: 15
    },
    ]

    const chartConfig = {
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

 
  return (
    <View style={styles.background}>
       <View style={styles.widget}>
      

    
      {/* Heading */}
      <Text style={styles.prompts}> Monthly Current Balance</Text>
      <Text style={styles.legendLabel}>
                Current Balance : ${categoryCounts.Income - categoryCounts.Expenditure}
              
              </Text>
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
                {categoryCounts.Income !== 0 ? ((data.population / (categoryCounts.Income + categoryCounts.Expenditure)) * 100).toFixed(2) : 0}
                %)
              </Text>
            </View>
            
          ))}
          </View>
       

       

      {/* Button to return to home page */}
      <Pressable onPress={() => navigation.navigate("Home-Home")}>
        <View style={styles.button}>
          <Text style={styles.prompts}>GO BACK</Text>
        </View>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    , height: 650
    , width: 370
    , padding: 10
    , backgroundColor: '#ffe9de'
    , justifyContent: 'space-evenly'
},
  prompts: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  entry: {
    //flexDirection: "row",
    marginBottom: "5%",
    backgroundColor: "#ffdeb7",
    borderColor: "#ff8100",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    padding: 15,
    paddingTop: 25,
  },
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
    textAlign: "center",
    

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
