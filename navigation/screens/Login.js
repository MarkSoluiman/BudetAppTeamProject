<<<<<<< Updated upstream
import { View, Text } from 'react-native'

export default function Login({navigation}){
    return(
        <View
        style={{flex:1, backgroundColor: '#ffdeb7', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Login Screen</Text>
        </View>
    )
}
=======
//components import
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { auth,db } from "../../firebase.js";
// import { useNavigation } from "@react-navigation/native";



// Exported function
export default function Login({ navigation }) {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const auth=getAuth()
    

   useEffect(()=>{
    const unSubscribe=onAuthStateChanged(auth,user=>{
      if(user){
        navigation.navigate("Home")
      }
    })

    return unSubscribe
   },[])

    //To handle signup
    const signUpHandler=()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(userCredentials =>{
            const user=userCredentials.user
           console.log("Registered with:",user.email)
        })

        .catch(error =>{alert(error.message)})
        
    }

    //To handle sign in

    const signINHandler= ()=>{
      signInWithEmailAndPassword(auth,email,password)
      .then(userCredentials=>{
        const user=userCredentials.user
        console.log("Logged in with :",user.email)
      })
      .catch(error=>{alert(error.message)})
    }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={ text=>setEmail(text) }
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={ text=>setPassword(text) }
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={signINHandler} style={styles.button}>
          <Text style={styles.button}>Login</Text>
        </Pressable>
        <Pressable onPress={signUpHandler} style={[styles.button,styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}> Signup</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    
  },
  inputContainer: {
    width:"80%",
    
  },
  background: {
    flex: 1,
    backgroundColor: "#ffa500",
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    padding: 2,
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "white",
    width: "50%",
  },
  input:{
    backgroundColor:"white",
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    marginTop:5,
  },
  buttonContainer: {
    width:"60%",
    justifyContent:"center",
    alignItems:"center",
    marginTop:40,
  },
  button: {
    backgroundColor:"#ffa500",
    width:"100%",
    paddingHorizontal:15,
    borderRadius:10,
    alignItems:"center",


  },
  buttonOutline:{
    backgroundColor:"white",
    marginTop:15,
    borderColor:"#ffa500",
    borderWidth:2,

  },
  buttonOutlineText:{
    color:"black",
    fontWeight:"700",
    fontSize:16,
  },
  buttonText:{
    color:"white",
    fontWeight:"700",
    fontSize:16,
  }
});
>>>>>>> Stashed changes
