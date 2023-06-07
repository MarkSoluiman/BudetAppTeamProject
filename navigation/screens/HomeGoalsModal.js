// Component imports
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { db, firebase } from '../../firebase.config';
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

// Exported function
export default function HomeGoalsModal({ navigation }) {
  const [goalsList, setGoalsList] = useState([]);
 

  useEffect(() => {
    const todoRef = query(
      collection(firebase.firestore(), "Goals"),
      where("uid", "==", getAuth().currentUser.uid),
      where("goal_complete", "==", false),
      orderBy("goal_date", "asc")
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

  const Progress = ({ step, steps, height }) => {
    //useRef for  React keep track of the animation when re rendered the animated value will be the same
    //Animated value is 1000 so we move the animation out side of the screen so we get the width of the screen
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: reactive,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, []);

    React.useEffect(() => {
      // -width + width * step/ steps
      reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    

    return (
      <>
        <Text style={{ fontSize: 12, fontWeight: "900", marginBottom: 8 }}>
          ${step} /${steps}
        </Text>
        <View
          onLayout={(e) => {
            const newWidth = e.nativeEvent.layout.width;
            setWidth(newWidth);
          }}
          style={{
            height,
            backgroundColor:  "#ffe9de",
            borderRadius: height,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={{
              height,
              width: "100%",
              borderRadius: height,
              backgroundColor:  "#ff8100",
              position: "absolute",
              left: 0,
              top: 0,
              transform: [
                {
                  translateX: animatedValue,
                },
              ],
            }}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.widget}>
        <Text style={styles.prompts}> Goal Bar Progress </Text>
        <StatusBar hidden />
        <FlatList
          data={goalsList}
          renderItem={({ item }) => (
            <View style={styles.entry}>
              <Text> Goal Name : {item.goal_name}</Text>
              <Progress
                step={item.goal_balance}
                steps={item.goal_amount}
                height={20}
              />
            </View>
          )}
        />
        

        <Pressable onPress={() => navigation.navigate("Home")}>
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
  background: {
    flex: 1,
    backgroundColor: "#ffdeb7",
    justifyContent: "center",
    padding: 20,
  },
  widget: {
    borderRadius: 10,
    borderColor: "#ff8100",
    borderWidth: 3,
    width: 370,
    padding: 15,
    backgroundColor: "#ffe9de",
    justifyContent: "space-evenly",
  },
  prompts: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 10,
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
  button: {
    backgroundColor: "#ff8100",
    borderRadius: 25,
    paddingVertical: 10,
    height: 50,
    width: 90,
    margin: 25,
    alignSelf: "center",
  },
});
