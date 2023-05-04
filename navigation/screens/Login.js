
//components import
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Button, Alert, TouchableOpacity} from 'react-native'
import { auth } from '../../firebase.config';

// Exported function
export default function Login({navigation}){


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogout = async ()=>{
    await signOut(auth);
}
  

  //async as we will be calling firebase function to check if the email && password is enetered
  const handleSubmit = async ()=>{
    
         if(email && password){
             try{
                 await signInWithEmailAndPassword(auth, email, password)
 
             }catch(err) {
                 console.log('got error: ', err.message);
                 Alert.alert('LogIn Error: ',err.message)
 
             }
 
 
         } else{
            Alert.alert('LogIn error : Please enter Email and Password to LogIn')
         }
        }

    return(
        <View style={styles.background}>
            {/* Heading */}
            <Text  style ={styles.headingText} >MOBILE </Text>
            <Text  style ={styles.headingText} > BUDGETING</Text>
            <Text  style = {styles.subHeadingText}>LOG IN</Text>

            <TextInput style ={styles.textInput} 
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder='Email'/>
              <Text style = {styles.subHeadingText}>PASSWORD</Text>

            <TextInput style = {styles.textInput}
              value ={password}
               onChangeText={value => setPassword(value)}
               placeholder='Password'
                secureTextEntry = {true} /> 

             <View style = {{flexDirection: 'row', width : '50%', justifyContent: 'space-between', alignItems: 'center' }}>

             <TouchableOpacity style = {styles.button}
             onPress = {() => navigation.navigate('Sign Up')}
             >
                <Text style= {{
                    color : 'white'
                }}>
                    SIGN UP
                </Text>
             </TouchableOpacity>

             <TouchableOpacity style = {styles.button}
             onPress = {handleSubmit} 
             >
                <Text style= {{
                    color : 'white'
                }}>
                    LOGIN
                </Text>
             </TouchableOpacity>

        
          </View> 
        </View>
    )
}


// Styling
const styles = StyleSheet.create({
    background: {
        flex:1
        , backgroundColor: '#ff8101'
        , alignItems: 'center'
        , justifyContent: 'center'
       
    },
    headingText:{
      color : '#ffe9df', 
      fontWeight: 'bold',
      fontSize : 35,
      marginBottom: 5
  },

  subHeadingText:{
    color : 'white', 
    fontWeight: 'bold',
    fontSize : 15,

},

   button: {
    backgroundColor : '#903800',
                height : 30,
                width: 80,
                marginTop: 10,
                borderRadius: 20,
                justifyContent : 'center',
                alignItems : 'center'
   },

    textInput : {
        padding : 2,
        borderWidth: 1,
        borderRadius: 9,
        borderColor:'#ffdeb7',
        backgroundColor : '#ffdeb7',
        width: '50%',
         marginVertical : 10


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
