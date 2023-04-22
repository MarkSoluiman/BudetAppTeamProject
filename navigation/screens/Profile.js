// Component imports
import { View, Text, Pressable,StyleSheet } from 'react-native'

// Exported function
export default function Profile({navigation}){
    return(
        <View style={styles.background}>
            
            {/* Heading */}
            <Text>Profile Screen</Text>
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
    }
})