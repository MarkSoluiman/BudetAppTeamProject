// Components import
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React,{useState} from 'react'; 
import { View, Text, StyleSheet, Dimensions, TextInput, Alert, TouchableOpacity} from 'react-native'
import { auth } from '../../firebase.config';

//import firebase from 'firebase'
import { firebase } from '../../firebase.config';

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
                    console.log(getAuth().currentUser.uid)
                    firebase.firestore().collection('Profile').add({
                        uid: getAuth().currentUser.uid,
                        email: getAuth().currentUser.email,
                        password: password,
                        primaryLocation: null,
                        student: null,
                        transportMeans: null,
                        notifications: true,
                    })
                   
    
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
            <Text style ={styles.headingText} >MOBILE</Text>
            <Text style ={styles.headingText} >BUDGETING</Text>
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

            <Text style = {styles.subHeadingText}>CONFIRM PASSWORD</Text>

            <TextInput style = {styles.textInput} 
            placeholder='Confirm Password'
            value = {confirmPassword}
            onChangeText={value => setconfirmPassword(value)}
            secureTextEntry = {true} />

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style= {styles.buttonText}>GO BACK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
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
    buttons:{
        flexDirection: 'row'
        , width : Dimensions.get('window').width/2
        , justifyContent: 'space-between'
    },
    buttonText:{
        color: 'white'
    },
    button: {
        backgroundColor : '#903800',
        height: Dimensions.get('window').height/20,
        width: Dimensions.get('window').width/4.5,
        marginTop: 10,
        borderRadius: 20,
        justifyContent : 'center',
        alignItems : 'center'
    },
    textInput: {
        paddingLeft: 10,
        paddingVertical: 4,
        borderWidth: 1,
        borderRadius: 9,
        borderColor:'#ffdeb7',
        backgroundColor : '#ffdeb7',
        width: Dimensions.get('window').width/2,
        marginVertical : 10
    }
})