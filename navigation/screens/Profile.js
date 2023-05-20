import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { doc, collection, addDoc, updateDoc } from "firebase/firestore/lite";
import { auth, db, firebase } from "../../firebase.config";
import { getAuth, signOut } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";

// Exported function
export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState("");
  const [primaryLocation, setPrimaryLocation] = useState("");
  const [transportMeans, setTransportMeans] = useState("");
  const [profileID, setProfileID] = useState("");

  // Function to save data
  const saveData = async () => {
    // Find document for authenticated user
    firebase
      .firestore()
      .collection("Profile")
      .where("uid", "==", getAuth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          setProfileID(documentSnapshot.id);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // Document will be updating as the following. Done individually as users don't have to change all fields.
    const profileDocRef = doc(db, "Profile", profileID);
    const dataEmail = {
      email: email,
    };
    const dataPass = {
      password: password,
    };
    const dataLocation = {
      primaryLocation: primaryLocation,
    };
    const dataStudent = {
      student: student,
    };
    const dataTransport = {
      transportMeans: transportMeans,
    };

    // Input validation
    if (email.length > 0) {
      updateDoc(profileDocRef, dataEmail)
        .then((profileDocRef) => {
          console.log("Field has been updated");
          Alert.alert("Saved");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (password.length > 5) {
      updateDoc(profileDocRef, dataPass)
        .then((profileDocRef) => {
          console.log("Field has been updated");
          Alert.alert("Saved");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (primaryLocation.length > 1) {
      addDoc(profileDocRef, dataLocation)
        .then((profileDocRef) => {
          console.log("Field has been updated");
          Alert.alert("Saved");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (student.length > 0) {
      addDoc(profileDocRef, dataStudent)
        .then((profileDocRef) => {
          console.log("Field has been updated");
          Alert.alert("Saved");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (transportMeans.length > 0) {
      addDoc(profileDocRef, dataTransport)
        .then((profileDocRef) => {
          console.log("Field has been updated");
          Alert.alert("Saved");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.background}>
      <View style={styles.widget}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textStyle}>Email</Text>
          <TextInput
            style={styles.entry}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder={getAuth().currentUser.email}
          />

          {/* Password prompt and entry */}
          <Text style={styles.prompts}>Password</Text>
          <TextInput
            style={styles.entry}
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder={getAuth().currentUser.password}
            secureTextEntry = {true}
          />

          {/* Student prompt and picker */}
          <Text style={styles.prompts}>Are you a Student?</Text>
          <View style={styles.drop}>
            <Picker
              selectedValue={student}
              onValueChange={(itemValue, itemIndex) => {
                setStudent(itemValue);
              }}
            >
              <Picker.Item label="Select student status type..." value="" />
              <Picker.Item label="Student" value="true" />
              <Picker.Item label="Not a student" value="false" />
            </Picker>
          </View>

          {/* Location prompt and entry */}
          <Text style={styles.prompts}>Primary Location</Text>
          <TextInput
            style={styles.entry}
            value={primaryLocation}
            onChangeText={(value) => setPrimaryLocation(value)}
            placeholder="Primary location "
          />

          {/* Transport prompt and picker  */}
          <Text style={styles.prompts}>Transport Means</Text>
          <View style={styles.drop}>
            <Picker
              selectedValue={transportMeans}
              onValueChange={(itemValue, itemIndex) => {
                setTransportMeans(itemValue);
              }}
            >
              <Picker.Item label="Select transport means..." value="" />
              <Picker.Item label="Car" value="car" />
              <Picker.Item label="Cycling" value="cycling" />
              <Picker.Item label="Walking" value="walking" />
              <Picker.Item label="Bus" value="bus" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#ffe9df",
            height: 50,
            margin: 20,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => saveData()}
        >
          <Text
            style={{
              color: "black",
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text> LOG OUT </Text>
      </TouchableOpacity>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ffdeb7",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: "6%",
  },
  widget: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 15,
    width: 350,
    height: 625,
    padding: 15,
    backgroundColor: "#ffdeb7",
    justifyContent: "center",
  },
  semiWidget: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 15,
    width: 400,
    height: 675,
    padding: 15,
    justifyContent: "center",
  },
  entry: {
    borderRadius: 15,
    borderColor: "#ff8100",
    borderWidth: 6,
    width: 370,
    height: 50,
    backgroundColor: "#ffe9de",
    marginVertical: "3.5%",
    paddingHorizontal: "5%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 7,
  },
  prompts: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  drop: {
    borderRadius: 15,
    borderColor: "#ff8100",
    borderWidth: 6,
    width: 370,
    height: 50,
    backgroundColor: "#ffe9de",
    marginVertical: "3.5%",
    paddingHorizontal: "5%",
    alignSelf: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
  textInput: {
    padding: 3,
    borderWidth: 5,
    fontSize: 15,
    borderColor: "#ff8100",
    backgroundColor: "#ffe9df",
    borderRadius: 9,
    width: "80%",
    marginVertical: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
