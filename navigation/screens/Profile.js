// Component imports
import { useState } from 'react';
import { View, Text, Pressable,StyleSheet, Button } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { collection, addDoc } from "firebase/firestore"; 
import { auth , db } from '../../firebase.config';
import { signOut } from 'firebase/auth';

// Exported function
export default function Profile({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [student, setStudent] = useState('');
    const [primaryLocation, setPrimaryLocation] = useState('');
    const [transportMeans, setTransportMeans] = useState('');
    const saveData = async()=> {
        const docRef = await addDoc(collection(db, "Profile"), {
            Email : email,
            Password : password,
            PrimaryLocation : primaryLocation,
            Student : student,
            TransportMeans : transportMeans
          });
          console.log("Document written with ID: ", docRef.id);
    }

    const handleLogout = async ()=>{
        await signOut(auth);
    }



    return(
        <View style={styles.container}>
            
            
            <View style={styles.widget}> 
            
             <View style = {{  alignItems : 'center'}} >
            <Text>Email</Text>
            <TextInput style ={styles.textInput} 
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder='Email'/>

             <Text>Password</Text>
             <TextInput style ={styles.textInput} 
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder='Password'/>

             <Text>Are you a Student ?</Text>
             <TextInput style ={styles.textInput} 
              value={student}
              onChangeText={value => setStudent(value)}
              placeholder='Yes/No'/>

               <Text>Primary Location</Text>
             <TextInput  style ={styles.textInput} 
              value={primaryLocation}
              onChangeText={value => setPrimaryLocation(value)}
             placeholder='Primary location '/>



              <Text>Transport Means</Text>
             <TextInput  style ={styles.textInput} 
              value={transportMeans}
              onChangeText={value => setTransportMeans(value)}
              placeholder='Transport means '/>
             </View>

             <TouchableOpacity style = {{
                backgroundColor : '#ffe9df',
                height : 50,
                margin: 20, 
                borderRadius: 20,
                justifyContent : 'center',
                alignItems : 'center'
             }}
             onPress ={()=> saveData()}
             >   
                <Text style= {{
                    color : 'black'
                }}>
                    SAVE
                </Text>
             </TouchableOpacity>
            
            </View>
            <TouchableOpacity 
                onPress={handleLogout}>
                    <Text> LOG OUT </Text>
                </TouchableOpacity>

              
            
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex:1
        , backgroundColor: '#ffdeb7'
        , alignItems: 'center'
        , justifyContent: 'space-evenly'
    },
    widget:{
        marginHorizontal: 20
        , marginVertical: 20
        , borderRadius: 15
        , width: 370
        , height: 505
        , padding: 15
        , backgroundColor: '#ff8100'
        , justifyContent: 'center'
        
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
        alignItems: 'center',
    },
})
