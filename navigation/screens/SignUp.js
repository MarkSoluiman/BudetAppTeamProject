// Components import
import { View, Text, Pressable, StyleSheet, Button, TextInput } from 'react-native'

// Exported function
export default function SignUp({navigation}){
    return(
        <View style={styles.background}>

            {/* Heading */}
            <Text >MOBILE BUDGETING  </Text>
            <Text>Sign Up Screen</Text>
            <Text>EMAIL</Text>
            <TextInput style ={styles.textInput} placeholder='Email'/>
            <Text>PASSWORD</Text>
            <TextInput style = {styles.textInput}
             placeholder='Password'
             secureTextEntry = {true} />
            <Text> CURRENRT PASSWORD</Text>
            <TextInput style = {styles.textInput} 
            placeholder=' confirm Password'
            secureTextEntry = {true} />
            <View style = {{flexDirection: 'row', width : '50%', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button title='GO BACK'
             color={'#903800'} 
             onPress = {() => navigation.navigate('Login')}
             />  
               <Button title='SIGN UP'
             color={'#903800'} 
             onPress = {() => navigation.navigate('Home')}
             /> 
             </View>
           
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