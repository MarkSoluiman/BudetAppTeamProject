import { View, Text, Pressable } from 'react-native'

export default function SignUp({navigation}){
    return(
        <View
        style={{flex:1, backgroundColor: '#ffdeb7', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Sign Up Screen</Text>
            <Pressable onPress={() => navigation.navigate('Login')}><Text>Login screen</Text></Pressable>
        </View>
    )
}