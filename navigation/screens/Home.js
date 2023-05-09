import * as React from "react";
import { View, Text , Dimensions} from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export default function Home({ navigation }) {
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.2, 0.6, 0.8],
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: 'flex-start' , marginTop : 10}}>
      <Text>Home Screen</Text>

      <ProgressChart
        style = {{borderRadius : 5}}
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        strokeWidth={16}
        radius={32}
        const chartConfig = {{
            backgroundGradientFrom: "#f7831e",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#f7831e",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
        hideLegend={false}
      />
    </View>
  );
}
