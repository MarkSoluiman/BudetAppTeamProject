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

// Exported function
export default function HomeIncomeModal({ navigation }) {
  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Monthly Income</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Line Chart</Text>
        <LineChart
          data={{
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
            datasets: [
              {
                data: [
                  Math.random() * 2,
                  Math.random() * 2,
                  Math.random() * 2,
                  Math.random() * 2,
                  Math.random() * 2,
                  Math.random() * 2,
                ],
                strokeWidth: 3,
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#dd1efa",
            backgroundGradientTo: "#494dbf",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 20,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "4",
              stroke: "#faf5f5",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
  },
});
