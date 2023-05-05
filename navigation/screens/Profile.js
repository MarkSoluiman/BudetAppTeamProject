// Component imports
import { useState } from 'react';
import { View, Text, Pressable,StyleSheet, Button , Alert} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { collection, addDoc } from "firebase/firestore"; 
import { auth , db, firebase, app} from '../../firebase.config';
import { signOut, getAuth } from 'firebase/auth';
// Exported function
export default function Profile({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [student, setStudent] = useState('');
    const [primaryLocation, setPrimaryLocation] = useState('');
    const [transportMeans, setTransportMeans] = useState('');
    const saveData = async()=> {
        const docRef = await addDoc(collection(db, "Profile"), {  
            uid: getAuth().currentUser.uid,
            Email : email,
            Password : password,
            PrimaryLocation : primaryLocation,
            Student : student,
            TransportMeans : transportMeans
          });
          console.log("Document written with ID: ", docRef.id);
          Alert.alert('Saved successfully')
    }

    const handleLogout = async ()=>{
        await signOut(auth);
    }



    return(
        <View style={styles.background}>
            <View style={styles.semiWidget} >
            <View style={styles.widget}> 
            
             <View style = {{  alignItems : 'center'}} >
            <Text style ={styles.textStyle} >Email</Text>
            <TextInput style ={styles.textInput} 
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder='Email'/>

             <Text  style ={styles.textStyle} >Password</Text>
             <TextInput style ={styles.textInput} 
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder='Password'/>

             <Text  style ={styles.textStyle} >Are you a Student ?</Text>
             <TextInput style ={styles.textInput} 
              value={student}
              onChangeText={value => setStudent(value)}
              placeholder='Yes/No'/>

               <Text  style ={styles.textStyle} >Primary Location</Text>
             <TextInput  style ={styles.textInput} 
              value={primaryLocation}
              onChangeText={value => setPrimaryLocation(value)}
             placeholder='Primary location '/>



              <Text  style ={styles.textStyle} >Transport Means</Text>
             <TextInput  style ={styles.textInput} 
              value={transportMeans}
              onChangeText={value => setTransportMeans(value)}
              placeholder='Transport means '/>
             </View>

             <TouchableOpacity style = {{backgroundColor : '#ff8100',
                height : 50,
                margin: 20, 
                borderRadius: 20,
                justifyContent : 'center',
                alignItems : 'center'}}
               onPress ={()=> saveData()}
             >   
                <Text style= {{
                    color : 'black'
                }}>
                    SAVE
                </Text>
             </TouchableOpacity>

             <TouchableOpacity style = {{backgroundColor : '#bd5100',
                height : 30,
                margin: 10, 
                borderRadius: 20,
                justifyContent : 'center',
                alignItems : 'center'}}
                onPress={handleLogout}>
                    <Text> LOG OUT </Text>
                </TouchableOpacity>

            </View>
            </View>

              
            
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
        marginHorizontal: 10
        , marginVertical: 20
        , borderRadius: 15
        , width: 350
        , height: 625
        , padding: 15
        , backgroundColor: '#ffdeb7'
        , justifyContent: 'center'
        
    },
    semiWidget:{
        marginHorizontal: 10
        , marginVertical: 20
        , borderRadius: 15
        , width: 400
        , height: 675
        , padding: 15
        , backgroundColor: '#ff8100'
        , justifyContent: 'center'
        
    },

    textStyle: {
        textAlign: 'center'
        , fontWeight: 'bold'
        , fontSize: 17

    },


    textInput: {
        padding : 3,
        borderWidth: 5,
        fontSize: 15,
        borderColor:'#ff8100',
        backgroundColor : '#ffe9df',
        borderRadius: 9,
        width: '80%',
        marginVertical : 10,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})