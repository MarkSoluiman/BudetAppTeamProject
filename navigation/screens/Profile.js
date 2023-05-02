// Component imports
import { useState } from 'react';
import { View, Text, Pressable,StyleSheet, Button } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { collection, addDoc } from "firebase/firestore"; 
import { auth , db } from '../../firebase.config';
// Exported function
export default function Profile({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [primaryLocation, setPrimaryLocation] = useState('');
    const [transportMeans, setTransportMeans] = useState('');
    const saveData = async()=> {
        const docRef = await addDoc(collection(db, "Profile"), {
            Email : email,
            Password : password,
            PrimaryLocation : primaryLocation,
            TransportMeans : transportMeans
          });
          console.log("Document written with ID: ", docRef.id);
    }


    return(
        <View style={styles.background}>
            
           
           
          
            <View style={styles.widget}> 
            
             <View >
            <Text>Email</Text>
            <TextInput style ={styles.textInput} 
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder='Email'/>

             <TextInput style ={styles.textInput} 
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder='password'/>

               <Text>Primary Location</Text>
             <TextInput  style ={styles.textInput} 
              value={primaryLocation}
              onChangeText={value => setPrimaryLocation(value)}
             placeholder='primary location '/>

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
            
            <Pressable onPress={() => navigation.navigate('Home')}><Text> Go back to Home page</Text></Pressable>
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    background: {
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
        , justifyContent: 'space-evenly'
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