// Component imports
import { View, Text, Pressable, StyleSheet} from 'react-native'

// Exported function
export default function Login({navigation}){
    return(
        <View style={styles.background}>
            {/* Heading */}
            <Text>Login Screen</Text>

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
        , backgroundColor: '#ffdeb7'
        , alignItems: 'center'
        , justifyContent: 'center'
    }
})