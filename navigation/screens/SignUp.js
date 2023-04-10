// Components import
import { View, Text, Pressable, StyleSheet } from 'react-native'

// Exported function
export default function SignUp({navigation}){
    return(
        <View style={styles.background}>

            {/* Heading */}
            <Text>Sign Up Screen</Text>

            {/* Button to continue to login screen */}
            <Pressable onPress={() => navigation.navigate('Login')}><Text>SAVE AND LOGIN</Text></Pressable>
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