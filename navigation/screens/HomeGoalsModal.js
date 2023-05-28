// Component imports
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { firebase } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot,orderBy } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function HomeGoalsModal({ navigation }) {
  const [goalsList, setGoalsList] = useState([]);
  const [transList, setTransList] = useState([]);
  const [yearPicker, setYearPicker] = useState(2023);

  useEffect(() => {
    const todoRef = query(
      collection(firebase.firestore(), "Goals"),
      where("uid", "==", getAuth().currentUser.uid),
      where("goal_complete", "==", false),
      orderBy ("goal_date", "asc")
    );

    const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
      const goalsList = [];
      querySnapshot.forEach((doc) => {
        const { goal_date, goal_name, goal_balance, goal_amount } = doc.data();
        goalsList.push({
          goal_date: goal_date.toDate(),
          goal_name,
          goal_balance,
          goal_amount,
        });
      });
      setGoalsList(goalsList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const transRef = query(
      collection(firebase.firestore(), "Logs"),
      where("uid", "==", getAuth().currentUser.uid),
      orderBy ("trans_date", "desc")
    );

    const unsubscribe = onSnapshot(transRef, (querySnapshot) => {
      const transList = [];
      querySnapshot.forEach((doc) => {
        const { trans_date, trans_name, trans_amount, trans_type } = doc.data();
        transList.push({
          trans_date: trans_date.toDate(),
          trans_name,
          trans_amount,
          trans_type,
        });
      });
      setTransList(transList);
    });

    return () => unsubscribe();
  }, []);

  const handleDecrement = () => {
    setYearPicker((yearPicker) => yearPicker - 1);
  };

  const handleIncrement = () => {
    setYearPicker((yearPicker) => yearPicker + 1);
  };

  const generateDataForChart = () => {
    const labels = goalsList.map((goal) => goal.goal_name);
    const data = {
      labels: labels,
      legend: labels,
      data: [],
      barColors: ["#afddd5", "#ffcccd", "#dfe6e6", "#ffbdo0", "#f2f25a"],
    };
  
    const goalBalancesByMonth = Array(12)
      .fill()
      .map(() => Array(data.legend.length).fill(0));
  
    for (const goal of goalsList) {
      const goalYear = goal.goal_date.getFullYear();
      if (goalYear === yearPicker) {
        const monthIndex = goal.goal_date.getMonth();
        const goalIndex = data.legend.indexOf(goal.goal_name);
        goalBalancesByMonth[monthIndex][goalIndex] += goal.goal_balance;
      }
    }
  
    data.data = goalBalancesByMonth;
  
    const barSpacing = 0.2; // Adjust the spacing between each bar on the x-axis
  
    return {
      ...data,
      barPercentage: 1 - barSpacing,
      categoryPercentage: 1,
    };
  };
  const data = generateDataForChart();

  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Goal Bars</Text>
      <StackedBarChart
        data={data}
        width={Dimensions.get("window").width - 30}
        height={350}
        chartConfig={{
          backgroundGradientFrom: "#ff8100",
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: "#ff8100",
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
          useShadowColorFromDataset: false,
        }}
        style={{ borderRadius: 10, alignSelf: "center" }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
      />

      <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
        <Ionicons name="caret-back-circle-sharp" size={35} color="black" onPress={handleDecrement} />
        <Text style={{ marginTop: 12, fontSize: 20, fontWeight: "bold" }}>
          {yearPicker}
        </Text>
        <MaterialCommunityIcons name="arrow-right-drop-circle" size={35} color="black" onPress={handleIncrement} />
      </View>

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
    padding: 5,
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
