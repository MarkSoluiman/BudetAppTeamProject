//components import
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Button} from 'react-native'
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
                 //.catch(error=>{alert(error.message)})
 
             }
 
 
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

          <Button title='LOGIN'
           color={'#903800'} 
            onPress = {handleSubmit}
             />  
           <Button title='SIGN UP'
           color={'#903800'}              
           onPress = {() => navigation.navigate('Sign Up')}
           /> 
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

    textInput : {
        padding : 2,
        borderWidth: 1,
        borderRadius: 9,
        borderColor:'#ffdeb7',
        backgroundColor : '#ffdeb7',
        width: '50%',
         marginVertical : 10



    }



})