// Components import
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React,{useState} from 'react'; 
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { auth } from '../../firebase.config';

//import firebase from 'firebase'

// Exported function
export default function SignUp({navigation}){

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [currentPassword, setcurrentPassword] = useState('');

     //async as we will be calling firebase function to check if the email && password is enetered
     const handleSubmit = async ()=>{
        if(email && password){
            try{
                await createUserWithEmailAndPassword(auth, email, password)

            }catch(err) {
                console.log('got error: ', err.message);

            }


        }

     }
          

    return(
        <View style={styles.background}>

            {/* Heading */}
            <Text style ={styles.headingText} >MOBILE  </Text>
            <Text style ={styles.headingText} > BUDGETING  </Text>
            <Text style = {styles.subHeadingText}>SIGN UP</Text>
            <Text style = {styles.subHeadingText}>EMAIL</Text>

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

            <Text style = {styles.subHeadingText}> CURRENRT PASSWORD</Text>

            <TextInput style = {styles.textInput} 
            placeholder=' confirm Password'
            value = {currentPassword}
            onChangeText={value => setcurrentPassword(value)}
            secureTextEntry = {true} />

            <View style = {{flexDirection: 'row', width : '50%', justifyContent: 'space-between', alignItems: 'center' }}>

            <Button title='GO BACK'
             color={'#903800'} 
             onPress = {() => navigation.navigate('Login')}
             />  
               <Button title='SIGN UP'
             color={'#903800'}              
             onPress = {handleSubmit}
             /> 
             </View>           
             <Text> Email : {email} Password : {password}</Text>
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    background: {
        flex:1,
        padding:20
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
    
    textInput: {
        padding : 3,
        borderWidth: 1,
        fontSize: 20,
        borderColor:'#ffdeb7',
        backgroundColor : '#ffdeb7',
        borderRadius: 9,
        width: '80%',
        marginVertical : 10,
        marginBottom: 15,
        alignItems: 'center'
    }

   
})