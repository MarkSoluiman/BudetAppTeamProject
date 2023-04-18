//components import
import { View, Text, Pressable, StyleSheet, TextInput, Button} from 'react-native'

// Exported function
export default function Login({navigation}){
    return(
        <View style={styles.background}>
            {/* Heading */}
            <Text>MPBILE BUDGETING</Text>
            <Text>LOG IN</Text>

            <Text>EMAIL</Text>
             <TextInput style = {styles.textInput} placeholder='Email'/>
             <Text>PASSWORD</Text>
             <TextInput style = {styles.textInput} placeholder='Password'/>



            {/* Buttons to login to access home page and full app OR to sign up */}
            <Pressable onPress={() => navigation.navigate('Home')}><Text>LOGIN</Text></Pressable>
            <Pressable onPress={() => navigation.navigate('Sign Up')}><Text>SIGN UP</Text></Pressable>
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    background: {
        flex:1
        , backgroundColor: '#ffa500'
        , alignItems: 'center'
        , justifyContent: 'center'
    },

    textInput : {
        padding : 2,
        borderWidth: 1,
        borderColor:'#cccccc',
        backgroundColor : 'white',
        width: '50%'



    }



})