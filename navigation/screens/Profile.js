import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { doc, collection, addDoc, updateDoc } from "firebase/firestore/lite";
import { auth, db, firebase } from "../../firebase.config";
import { getAuth, signOut, updateEmail, updatePassword } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { Switch } from '@rneui/themed'


// Exported function
export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState();
  const [primaryLocation, setPrimaryLocation] = useState("");
  const [transportMeans, setTransportMeans] = useState("");
  const [checked, setChecked] = useState(false);

  // Function to save data
  const saveData = async () => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) {
      console.log("User is not authenticated");
      return;
    }

  // Refresh user token
  const idToken = await currentUser.getIdToken(true);

    // Find document for authenticated user
    firebase
      .firestore()
      .collection("Profile")
      .where("uid", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const profileDocRef = doc(db, "Profile", documentSnapshot.id);

          // Document will be updating as the following. Done individually as users don't have to change all fields.
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
          const dataNotifs = {
            notifications: checked,
          }

          updateDoc(profileDocRef, dataNotifs).then(() => {
            console.log("Goal Notifications has been updated")
          })
          .catch((error) => {
            console.log(error)
          })
      
          // Input validation
          if (email.length > 0) {
            
            updateEmail(getAuth().currentUser, email)
              .then(() => {
                updateDoc(profileDocRef, dataEmail)
                .then(() => {
                  console.log("Email has been updated");
                })
                .catch((error) => {
                  console.log(error);
                });
                console.log("Email updated")
              }).catch((error) => {
                console.log("Updating email",error)
              })
          }
          if (password.length > 5) {
              updatePassword(getAuth().currentUser, password)
              .then(() => {
                updateDoc(profileDocRef, dataPass)
                .then(() => {
                  console.log("Password has been updated");
                })
                .catch((error) => {
                  console.log(error);
                });
                console.log("Password updated")
              }).catch((error) => {
                console.log("Updating password",error)
              })
          }
          if (primaryLocation.length > 1) {
            updateDoc(profileDocRef, dataLocation)
              .then(() => {
                console.log("Primary Location has been updated");
              })
              .catch((error) => {
                console.log(error);
              });
          }
          if (student != "") {
            updateDoc(profileDocRef, dataStudent)
              .then(() => {
                console.log("Student Status has been updated");
              })
              .catch((error) => {
                console.log(error);
              });
          }
          if (transportMeans.length > 0) {
            updateDoc(profileDocRef, dataTransport)
              .then(() => {
                console.log("Transport Means has been updated");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });



      //getting the password:
     


 

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

  // Switch
  const toggleSwitch = () => {
    setChecked(!checked)
  }

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    function fetchData() {
      firebase
        .firestore()
        .collection("Profile")
        .where("uid", "==", "oTwksGN0FncxUdmdljLlLWy6Cr92")
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const documentSnapshot = querySnapshot.docs[0];
            const password = documentSnapshot.data().password;
            setPassword(password);
            const primaryLocation=documentSnapshot.data().primaryLocation
            if(primaryLocation==null){
              setPrimaryLocation("No location was chosen")
            }else{
              setPrimaryLocation(primaryLocation)
            }

            const student=documentSnapshot.data().student
            setStudent(student)
           
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  



  return (
    <View style={styles.background}>
      <View style={styles.widget}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.prompts}>Email</Text>
          <TextInput
            style={styles.entry}
            value={getAuth().currentUser.email}
            onChangeText={(value) => setEmail(value)}
            defaultValue={getAuth().currentUser.email}
            
          />

          {/* Password prompt and entry */}
          <Text style={styles.prompts}>Password</Text>
          <TextInput
            style={styles.entry}
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder={password}

            editable={false}
          />

          {/* Student prompt and picker */}
          <Text style={styles.prompts}>Student Status</Text>
          <View style={styles.drop}>
            <Picker
              selectedValue={student}
              onValueChange={(itemValue, itemIndex) => {
                setStudent(itemValue);
              }}
            >
              <Picker.Item label="Select student status type..." value="" />
              <Picker.Item label="Student" value={true} />
              <Picker.Item label="Not a student" value={false} />
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

        {/* Notifications Switch */}
        <View style={styles.switchView}>
          <Text style={styles.sidePrompts}>Goal Notifications</Text>
          <Switch 
            style={styles.switch}
            color='#ff8100' 
            value={checked} 
            onValueChange={(value) => setChecked(value)} 
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <Text style={styles.prompts}>SAVE</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logButton} onPress={handleLogout}>
        <Text style={styles.prompts}>LOG OUT</Text>
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
  sidePrompts: {
    fontWeight: "bold",
    fontSize: 17,
    verticalAlign: 'middle'
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
  switchView: {
    flexDirection: 'row',
    verticalAlign: 'middle',
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  saveButton: {
    backgroundColor: "#ff8100",
    height: 50,
    marginTop: '5%',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logButton: {
    backgroundColor: "#ff8100",
    height: 40,
    width: 200,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }
});
