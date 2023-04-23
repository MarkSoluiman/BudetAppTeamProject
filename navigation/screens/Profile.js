// Component imports
import { View, Text, Pressable,StyleSheet, Button } from 'react-native'

// Exported function
export default function Profile({navigation}){
    return(
        <View style={styles.background}>
            
            {/* Heading */}
            <Text>Profile Screen</Text>
            <View style={styles.widget}> 
            <Button title='SAVE'
            color={'#ffe9df'}/>
            </View>
            
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
    },
    widget:{
        marginHorizontal: 20
        , marginVertical: 20
        , borderRadius: 15
        , width: 370
        , height: 605
        , padding: 15
        , backgroundColor: '#ff8100'
        , justifyContent: 'space-evenly'
    }
})