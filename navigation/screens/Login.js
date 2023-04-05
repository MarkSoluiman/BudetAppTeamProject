import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native'

export default function Login({navigation}){
    return(
        <KeyboardAvoidingView style ={styles.container}
        behaviour = "padding"> {/* this will help with keyboard populating on screen */}
            <View
        style={{flex:1, backgroundColor: '#ffdeb7', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Login Screen</Text>
        </View>
        </KeyboardAvoidingView>




       
    )
}

const styles = StyleSheet.create({


    container:{

        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center',
    },
})