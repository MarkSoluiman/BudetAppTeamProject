// Component imports
import { View, Text, Pressable,StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

// Exported function
export default function Profile({navigation}){
    return(
        <View style={styles.background}>
            
            {/* Heading */}
            <Text>Profile Screen</Text>
           
          
            <View style={styles.widget}> 
            
             <View>
                <Text>Email</Text>
             <TextInput style ={styles.textInput} 
              placeholder='email'/>
               <Text>Password</Text>
             <TextInput style ={styles.textInput} 
              placeholder='password'/>
               <Text>Primary Location</Text>
             <TextInput  style ={styles.textInput} 
             placeholder='primary location '/>
              <Text>Transport Means</Text>
             <TextInput  style ={styles.textInput} 
              placeholder='Transport means '/>
             </View>

             <Button title='SAVE'
             />

             
           
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