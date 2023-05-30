// Component imports
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const data = [
  {
    name: "- Profit",
    population: 250,
    color: "#919090",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "- Loss",
    population: 90,
    color: "#141313",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

// Exported function
export default function HomePLModal({ navigation }) {
  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Profit and Loss</Text>

      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={250}
        chartConfig = {{
            backgroundGradientFrom: '#ffa600',
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: '#ff6361',
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(211, 211, 211, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
          style= {{borderRadius: 10, alignSelf: 'center'}}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        
        absolute
      />

            {/* Button to return to home page */}
            <Pressable onPress={()=> navigation.navigate('Home')}>
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
    margin: 50,
    alignSelf: "center",
  }
})
