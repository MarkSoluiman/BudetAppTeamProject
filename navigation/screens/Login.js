import { View, Text, Pressable} from 'react-native'

export default function Login({navigation}){
    return(
        <View
        style={{flex:1, backgroundColor: '#ffdeb7', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Login Screen</Text>
            <Pressable onPress={() => navigation.navigate('Home')}><Text>LOGIN</Text></Pressable>
            <Pressable onPress={() => navigation.navigate('Sign Up')}><Text>SIGN UP</Text></Pressable>
        </View>
    )
}