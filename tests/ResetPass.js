//  Import components
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Alert, Dimensions } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Exported function
export default function ResetPass({ navigation }) {

    // Initialise constants
    const [email, setEmail] = useState("");
    const auth = getAuth();

    // Function called when user presses submit button
    const handleReset = () => {

        // Input validation, a string must be entered
        if (email.length > 0) {

            // Use authorisation and email to send a password reset email
            sendPasswordResetEmail(auth, email)

            // Success message
            .then(() => {
                Alert.alert("Password reset email sent successfully!");
            })

            // Unsuccessful message eg. invalid email
            .catch((error) => {
                Alert.alert("Error: " + error.message);
            });
        
        // Input validation alert message
        } else {
            Alert.alert("Please enter an email");
        }
    };

    // Return function
    return (
        <View style={styles.background}>

            {/* Heading */}
            <Text style={styles.headingText}>RESET PASSWORD</Text>

            {/* Email prompt and entry field */}
            <Text style={styles.subHeadingText}>ENTER EMAIL</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
            />

            {/* Action buttons */}
            <View style={styles.buttons}>

                {/* Back to login screen button */}
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => navigation.navigate("Login")}>
                    BACK
                    </Text>
                </Pressable>

                {/* Call handleReset function to reset password */}
                <Pressable style={styles.button} onPress={handleReset}>
                    <Text style={styles.buttonText}>RESET</Text>
                </Pressable>
            </View>
        </View>
    );
}

// Styling
const styles = StyleSheet.create({
    
    // Page styling
    background: {
        flex: 1,
        backgroundColor: "#ff8101",
        alignItems: "center",
        justifyContent: "center",
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
    textInput: {
        paddingLeft: 10,
        paddingVertical: 4,
        borderWidth: 1,
        borderRadius: 9,
        borderColor: "#ffdeb7",
        backgroundColor: "#ffdeb7",
        width: Dimensions.get('window').width/2,
        marginVertical: 10,
    },

    // Button styling
    button: {
        backgroundColor : '#903800',
        height: Dimensions.get('window').height/20,
        width: Dimensions.get('window').width/4.5,
        marginTop: 10,
        borderRadius: 20,
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttons:{
        flexDirection: 'row'
        , width : Dimensions.get('window').width/2
        , justifyContent: 'space-between'
    },
    buttonText: {
        color: "white",
    },
});
