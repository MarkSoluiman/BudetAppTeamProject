import { View, Text,StyleSheet } from 'react-native'


export default function Log({navigation}){
    return(
        <View
        style={styles.log}>
            <Text>Log Screen</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    log:{
        flex:1,
        backgroundColor:"#ffdeb7",
        alignItems:"center",
        justifyContent:"center"
    }
})

