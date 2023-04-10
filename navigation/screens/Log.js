// Component imports
import { View, Text, StyleSheet } from 'react-native'

// Exported function
export default function Log({navigation}){
    return(
        <View style={styles.background}>
            
            {/* Heading */}
            <Text>Log Screen</Text>
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    background:{
        flex:1
        , backgroundColor: '#ffdeb7'
        , alignItems: 'center'
        , justifyContent: 'center'
    }
})