import * as React from 'react'
import { View, Text } from 'react-native'

export default function Log({navigation}){
    return(
        <View
        style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Log Screen</Text>
        </View>
    )
}