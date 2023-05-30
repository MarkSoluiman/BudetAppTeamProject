import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { firebase } from "../../firebase.config";
import { ProgressChart } from "react-native-chart-kit";

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
        console.log(totalIncome/100);

        let totalExpenditure = 0;
        expenditureQuerySnapshot.forEach((documentSnapshot) => {
          const transAmount = documentSnapshot.data().trans_amount;
          totalExpenditure += parseInt(transAmount);
        });
        console.log(totalExpenditure/100);
        console.log((totalIncome - totalExpenditure)/100);

        setCategoryCounts({
          Income: totalIncome,
          Expenditure: totalExpenditure,
        });
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchData();

   
  }, []);

  const data = {
    labels: ["Income", "Expenditure", "Current Balance"],
    data: [
      categoryCounts.Income / 100,
      categoryCounts.Expenditure / 100,
      (categoryCounts.Income - categoryCounts.Expenditure) / 100
    ],
    barColors: ["#FA5B3D", "#e846e3", "#e846e3"],
  };

  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Current Balance</Text>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={350}
        chartConfig={{
          backgroundGradientFrom: "#ffdeb7",
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: "#ffdeb7",
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
          useShadowColorFromDataset: false,
        }}
        style={{ borderRadius: 10, alignSelf: 'flex-end' }}
      />

      {/* Button to return to home page */}
      <Pressable onPress={() => navigation.navigate("Home")}>
        <View style={styles.button}>
          <Text style={styles.prompts}>GO BACK</Text>
        </View>
      </Pressable>
    </View>
  );
}

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
