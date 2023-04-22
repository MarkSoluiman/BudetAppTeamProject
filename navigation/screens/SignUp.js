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

            }catch(error) {
                console.log('got error: ', errormessage);

            }


        }

     }
          

    return(
        <View style={styles.background}>

            {/* Heading */}
            <Text >MOBILE BUDGETING  </Text>
            <Text>Sign Up Screen</Text>
            <Text>EMAIL</Text>

            <TextInput style ={styles.textInput} 
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder='Email'/>

            <Text>PASSWORD</Text>

            <TextInput style = {styles.textInput}
             value ={password}
             onChangeText={value => setPassword(value)}
             placeholder='Password'
             secureTextEntry = {true} />

            <Text> CURRENRT PASSWORD</Text>

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
            // onPress = {() => navigation.navigate('Home')}
             /> 
             </View>
             <Text> email : {email} password = {password}</Text>
           
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    background: {
        flex:1,
        padding:20
        , backgroundColor: '#ffa500'
        , alignItems: 'center'
        , justifyContent: 'center'
    },
    
    textInput: {
        padding : 2,
        borderWidth: 1,
        borderColor:'#ffdeb7',
        backgroundColor : 'white',
        borderRadius: 6,
        width: '70%',
        marginVertical : 10
    }

   
})