<<<<<<< Updated upstream
import { View, Text } from 'react-native'
=======
// Component imports
import { getAuth, signOut } from 'firebase/auth'
import { View, Text, StyleSheet, Pressable } from 'react-native'
>>>>>>> Stashed changes

export default function Profile({navigation}){
const auth=getAuth()
const signOutHandler=()=>{
    signOut(auth).then(()=>{
        navigation.navigate("Login")
    })

    .catch(error=>{alert(error.message)})
}

    return(
<<<<<<< Updated upstream
        <View
        style={{flex:1, backgroundColor: '#ffdeb7', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Profile Screen</Text>
            {/* Test merge branches to main */}
        </View>
    )
}
=======
        <View style={styles.container}>
            
            
            <Text>Profile Screen</Text>
            <Text>Email:{auth.currentUser?.email}</Text>
            <Pressable style={styles.button} onPress={signOutHandler}>
                <Text style={styles.buttonText}>Sign out</Text>

            </Pressable>
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex:1
        , backgroundColor: '#ffdeb7'
        , alignItems: 'center'
        , justifyContent: 'center'
    },
    button:{
        backgroundColor:"#ffa500",
        width:"60%",
        padding:15,
        borderRadius:10,
        alignItems:"center",
        marginTop:40,
    },
    buttonText:{
        fontWeight:"700",
        fontSize:16,
    }

})
>>>>>>> Stashed changes
