import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail, generatePasswordResetLink } from "firebase/auth";

const auth = getAuth();

// Exported function
export default function ResetPass({ navigation }) {
  const [email, setEmail] = useState("");

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: "https://www.example.com/checkout?cartId=1234",
    // This must be true for email link sign-in.
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    // FDL custom domain.
    dynamicLinkDomain: "coolapp.page.link",
  };

  const handleReset = () => {
    if (email.length > 0) {
        sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert("Password reset email sent successfully!");
        })
        .catch((error) => {
          Alert.alert("Error: " + error.message);
        });
    } else {
      Alert.alert("Please enter an email");
    }
  };

  return (
    <View style={styles.background}>
      <Text style={styles.headingText}>RESET PASSWORD</Text>
      <Text style={styles.subHeadingText}>ENTER EMAIL</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
      />
      <View style={styles.buttons}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate("Login")}>
            BACK
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>RESET</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ff8101",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: "#ffdeb7",
    backgroundColor: "#ffdeb7",
    width: "50%",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#903800",
    height: 30,
    width: 80,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  headingText: {
    color: "#ffe9df",
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 5,
  },
  subHeadingText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
