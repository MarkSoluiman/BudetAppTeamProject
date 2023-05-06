// Component imports
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  legend: ["G1, G2, G3"],
  data: [
    [60, 60],
    [30, 30],
    [60, 60],
    [30, 30],
    [60, 60],
    [30, 30],
    [60, 60],
    [30, 30],
    [30, 30],
    [30, 30],
    [60, 60],
    [30, 30],
    
  ],
  barColors: ["#f2f25a", "#e3e31e", "#fa1eca"],
  
};
// Exported function
export default function HomeGoalsModal({ navigation }) {
  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Goal Bars</Text>
      <StackedBarChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig = {{
            backgroundGradientFrom: '#09c1eb',
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: '#07a0f2',
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
          style= {{borderRadius: 10, alignSelf: 'center'}}
          accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
      />

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
    backgroundColor: "#ffdeb7",
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
