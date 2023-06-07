// Component imports
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
  Button,
  route,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore/lite";
import { db, firebase } from "../../firebase.config";
import { getAuth } from "firebase/auth";

// Exported function
export default function LogModal({ navigation, route }) {
  // Initialise constants
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [tranDate, setTranDate] = useState("Select your transaction date");
  const [tranName, setTranName] = useState("");
  const [tranAmount, setTranAmount] = useState(
    route.params?.trans_amount || ""
  );
  const [selectedType, setSelectedType] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [goalsList, setGoalsList] = useState([]);
  const [goalID, setGoalID] = useState("");

  useEffect(() => {
    if (route.params) {
      // Assign parameter as log document ID
      const { logID } = route.params;

      // Query to find log document in firebase from assigned ID
      firebase
        .firestore()
        .collection("Logs")
        .doc(logID)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            // Set entry field variables to corresponding values in firebase

            setTranName(documentSnapshot.data().trans_name);
            setSelectedType(documentSnapshot.data().trans_type);
            setSelectedCat(documentSnapshot.data().trans_category);
            setTranAmount(documentSnapshot.data().trans_amount);
            setSelectedGoal(documentSnapshot.data().trans_goal);

            const logDateTimestamp = documentSnapshot.data().trans_date;
            const logDate = logDateTimestamp.toDate(); // Convert timestamp to Date object
            setDate(logDate);
            setTranDate(logDate.toDateString());

            // Possible error messages
          } else {
            console.log("Document not found!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Constants used to determine if app should render components for a new log to add, or an existing log to update
  const shouldRenderName = route.params;
  const shouldRenderAmount = !!route.params;

  const todoRef = firebase
    .firestore()
    .collection("Goals")
    .where("uid", "==", getAuth().currentUser.uid)
    .where("goal_complete", "==", false);

  // Initialise date picker for transaction date
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setTranDate(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  };

  const goalNotifications = async () => {
    // Find if goal met, goal_balance >= goal_met
    firebase
      .firestore()
      .collection("Goals")
      .where("uid", "==", getAuth().currentUser.uid)
      .where("goal_name", "==", selectedGoal)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data().goal_balance >=
            documentSnapshot.data().goal_amount
          ) {
            firebase
              .firestore()
              .collection("Goals")
              .where("uid", "==", getAuth().currentUser.uid)
              .where("goal_name", "==", selectedGoal)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((documentSnapshot) => {
                  console.log("balance>goal");

                  const goalDocRef = doc(db, "Goals", documentSnapshot.id);
                  const data = { goal_complete: true };

                  updateDoc(goalDocRef, data)
                    .then(() => {
                      console.log("Goal document updated");

                      // Find if goal notifications are on, if yes, alert user of goal completion
                      firebase
                        .firestore()
                        .collection("Profile")
                        .where("uid", "==", getAuth().currentUser.uid)
                        .where("notifications", "==", true)
                        .get()
                        .then((querySnapshot) => {
                          querySnapshot.forEach((documentSnapshot) => {
                            if (
                              documentSnapshot.data()["notifications"] === true
                            ) {
                              Alert.alert("Goal completed!");
                              console.log("Goal completed as a console log");
                            }
                          });
                        })
                        .catch((error) => {
                          console.log("Error getting documents: ", error);
                        });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add to goal balance, if there is an income association
  const increaseGoal = async () => {
    if (selectedGoal != null && selectedType === "Income") {
      firebase
        .firestore()
        .collection("Goals")
        .where("uid", "==", getAuth().currentUser.uid)
        .where("goal_name", "==", selectedGoal)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            const goalDocRef = doc(db, "Goals", documentSnapshot.id);
            const data = { goal_balance: increment(tranAmount) };

            updateDoc(goalDocRef, data)
              .then(() => {
                console.log(
                  "Goal field has been updated with income association"
                );
                goalNotifications();
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          console.log(error);
        }, 3000);
    }
  };

  // Validate entry input, if successful... write to firebase
  const handleSubmit = async () => {
    if (date) {
      if (tranName.length > 0) {
        if (
          Number.isInteger(parseInt(tranAmount)) &&
          parseInt(tranAmount) > 0
        ) {
          if (selectedType.length > 0) {
            if (selectedCat.length > 0) {
              if (selectedGoal == null || selectedGoal.length > 0) {
                // Save transaction and upload as new document to firebase
                Alert.alert("Transaction saved");
                navigation.navigate("Log-Log");
                const docRef = addDoc(collection(db, "Logs"), {
                  uid: getAuth().currentUser.uid,
                  trans_date: date,
                  trans_name: tranName,
                  trans_type: selectedType,
                  trans_amount: tranAmount,
                  trans_category: selectedCat,
                  trans_goal: selectedGoal,
                });

                increaseGoal();

                console.log("Document written with ID: ", (await docRef).id);

                // If unsuccessul... present user alert
              } else {
                Alert.alert(
                  "Error: A transaction goal association needs to be selected"
                );
              }
            } else {
              Alert.alert("Error: A transaction category needs to be selected");
            }
          } else {
            Alert.alert("Error: A transaction type needs to be selected");
          }
        } else {
          Alert.alert(
            "Error: Transaction amount must be a number greater than 0"
          );
        }
      } else {
        Alert.alert("Error: Transaction name be of length greater than 0");
      }
    } else {
      Alert.alert("Error: Date must be selected");
    }
  };

  // Use effect for fetching goals
  useEffect(() => {
    async function fetchData() {
      todoRef.onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const { goal_name } = doc.data();
          list.push({
            goal_name,
          });
        });
        setGoalsList(list);
      });
    }
    fetchData();
  }, []);

  const handleUpdate = async (logID) => {
    if (date) {
      if (tranName.length > 0) {
        if (
          Number.isInteger(parseInt(tranAmount)) &&
          parseInt(tranAmount) > 0
        ) {
          if (selectedType.length > 0) {
            if (selectedCat.length > 0) {
              if (selectedGoal == null || selectedGoal.length > 0) {
                amount = parseInt(tranAmount, 10);
                navigation.navigate("Log-Log");
                const logRef = doc(db, "Logs", logID);

                try {
                  await updateDoc(logRef, {
                    trans_date: date,
                    trans_name: tranName,
                    trans_type: selectedType,
                    trans_amount: tranAmount,
                    trans_category: selectedCat,
                    trans_goal: selectedGoal,
                  });
                  console.log("Transaction Log updated successfully");
                  Alert.alert("Transaction updated");
                } catch (error) {
                  console.log(" log document updated successfully");
                }
              } else {
                Alert.alert(
                  "Error: A transaction goal association needs to be selected"
                );
              }
            } else {
              Alert.alert("Error: A transaction category needs to be selected");
            }
          } else {
            Alert.alert("Error: A transaction type needs to be selected");
          }
        } else {
          Alert.alert(
            "Error: Transaction amount must be a number greater than 0"
          );
        }
      } else {
        Alert.alert("Error: Transaction name be of length greater than 0");
      }
    } else {
      Alert.alert("Error: Date must be selected");
    }
  };

  // Exported function
  return (
    <View style={styles.background}>
      {/* Date prompt and entry */}
      <Text style={styles.prompts}>DATE</Text>

      {!showPicker && (
        <Pressable style={styles.entry} onPress={toggleDatepicker}>
          <Text>{tranDate}</Text>
        </Pressable>
      )}
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={date}
          onChange={onChange}
        />
      )}

      {/* Transaction name prompt and entry */}
      <Text style={styles.prompts}>TRANSACTION NAME</Text>
      {shouldRenderName ? (
        <TextInput
          value={tranName}
          onChangeText={(tranName) => setTranName(tranName)}
          style={styles.entry}
        />
      ) : (
        <TextInput
          placeholder="Write your transaction name"
          onChangeText={(tranName) => setTranName(tranName)}
          style={styles.entry}
        />
      )}

      {/* Transaction type prompt and picker */}
      <Text style={styles.prompts}>TRANSACTION TYPE</Text>
      <View style={styles.drop}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedType(itemValue);
          }}
        >
          <Picker.Item label="Select transaction type..." value="" />
          <Picker.Item label="Expenditure" value="Expenditure" />
          <Picker.Item label="Income" value="Income" />
        </Picker>
      </View>

      {/* Transaction amount prompt and entry */}

      <Text style={styles.prompts}>AMOUNT</Text>
      {shouldRenderAmount ? (
        <TextInput
          value={tranAmount.toString()}
          keyboardType="numeric"
          onChangeText={(tranAmount) => setTranAmount(tranAmount)}
          style={styles.entry}
        />
      ) : (
        <TextInput
          placeholder="Write your transaction amount"
          keyboardType="numeric"
          onChangeText={(tranAmount) => setTranAmount(tranAmount)}
          style={styles.entry}
        />
      )}

      {/* Transaction category prompt and picker */}

      <Text style={styles.prompts}>CATEGORY</Text>
      <View style={styles.drop}>
        <Picker
          selectedValue={selectedCat}
          onValueChange={(itemValue, itemIndex) => setSelectedCat(itemValue)}
        >
          <Picker.Item label="Select transaction category..." value="" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Health" value="Health" />
          <Picker.Item label="Utilities" value="Utilities" />
          <Picker.Item label="Housing" value="Housing" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Schooling" value="Schooling" />
          <Picker.Item label="Miscellaneous" value="Miscellaneous" />
        </Picker>
      </View>

      {/* Transaction goal association prompt and picker */}
      <Text style={styles.prompts}>ASSOCIATE TO GOAL</Text>
      <View style={styles.drop}>
        <Picker
          selectedValue={selectedGoal}
          onValueChange={(itemValue, itemIndex) => setSelectedGoal(itemValue)}
        >
          <Picker.Item
            label="Select transaction goal association..."
            value=""
          />
          <Picker.Item label="No association" value={null} />
          {goalsList.map((item) => {
            return (
              <Picker.Item
                key={item.goal_name}
                label={item.goal_name}
                value={item.goal_name}
              />
            );
          })}
        </Picker>
      </View>

      {/* Buttons to save or cancel log data entry */}
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Log-Log")}
        >
          <Text style={styles.prompts}>BACK</Text>
        </Pressable>
        {shouldRenderName ? (
          <Pressable
            style={styles.button}
            onPress={() =>
              handleUpdate(route.params.logID) 
            }
          >
            <Text style={styles.prompts}>UPDATE</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.prompts}>SAVE</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ffdeb7",
    paddingVertical: "6%",
  },
  entry: {
    borderRadius: 15,
    borderColor: "#ff8100",
    borderWidth: 6,
    width: Dimensions.get("window").height - 500,
    height: Dimensions.get("window").height - 820,
    backgroundColor: "#ffe9de",
    marginVertical: "3.5%",
    paddingHorizontal: "5%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 7,
  },
  drop: {
    borderRadius: 15,
    borderColor: "#ff8100",
    borderWidth: 6,
    width: Dimensions.get("window").height - 500,
    height: Dimensions.get("window").height - 820,
    backgroundColor: "#ffe9de",
    marginVertical: "3.5%",
    paddingHorizontal: "5%",
    alignSelf: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
  prompts: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  buttons: {
    paddingTop: "2%",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#ff8100",
    borderRadius: 25,
    paddingVertical: 10,
    height: Dimensions.get("window").height - 820,
    width: Dimensions.get("window").height - 780,
    marginHorizontal: 20,
  },
});
