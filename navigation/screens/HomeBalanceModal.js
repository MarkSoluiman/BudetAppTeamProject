// Component imports
import { View, Text, StyleSheet, Pressable, Dimensions  } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const data = {
  labels: ["Income", "Expenditure", "Current Balance"], // optional
  data: [0.8, 0.3, 0.5],
  barColors: ["#47e6e6", "#e846e3","#e846e3"],
};

// Exported function
export default function HomeBalanceModal({ navigation }) {
  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Current Balance</Text>
      <ProgressChart
        data={data}
        width={Dimensions.get("window").width -30}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig = {{
            backgroundGradientFrom: '#ffa600',
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: '#ff6361',
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
          style= {{borderRadius: 10, alignSelf: 'center'}}
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