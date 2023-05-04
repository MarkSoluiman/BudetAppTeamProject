// Components import
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React,{useState} from 'react'; 
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity} from 'react-native'
import { auth } from '../../firebase.config';

//import firebase from 'firebase'

// Exported function
export default function SignUp({navigation}){

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [confirmPassword, setconfirmPassword] = useState('');

     //async as we will be calling firebase function to check if the email && password is enetered
     const handleSubmit = async ()=>{
        if(password == confirmPassword){ // checking if confirm password match password 

            if(email && password){
                try{
                    await createUserWithEmailAndPassword(auth, email, password)
                   
    
                }catch(err) {
                    console.log('got error: ', err.message);
                    Alert.alert('LogIn Error: ',err.message)
                    //.catch(error=>{alert(error.message)})
    
                }
    
            }
            else{
                 
                Alert.alert('LogIn Error: Please enter an Email and Password')
            }


        } else{ 
            console.log('got error: confirm password does not match the password' )
            Alert.alert('LogIn Error: confirm password does not match the password') // need to make pop up error messages 
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

            <Text style = {styles.subHeadingText}> CONFIRM PASSWORD</Text>

            <TextInput style = {styles.textInput} 
            placeholder=' Confirm Password'
            value = {confirmPassword}
            onChangeText={value => setconfirmPassword(value)}
            secureTextEntry = {true} />

            <View style = {{flexDirection: 'row', width : '70%', justifyContent: 'space-between', alignItems: 'center' }}>

              
               <TouchableOpacity style = {styles.button}
             onPress = {() => navigation.navigate('Login')}
             >
                <Text style= {{
                    color : 'white'
                }}>
                    GO BACK 
                </Text>
             </TouchableOpacity>

               <TouchableOpacity style = {styles.button}
             onPress = {handleSubmit} 
             >
                <Text style= {{
                    color : 'white'
                }}>
                    SIGN UP
                </Text>
             </TouchableOpacity>
             </View>           
             
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

    button: {
        backgroundColor : '#903800',
                    height : 30,
                    width: 80,
                    marginTop: 10,
                    borderRadius: 20,
                    justifyContent : 'center',
                    alignItems : 'center'
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