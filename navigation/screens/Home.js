import * as React from 'react'
import { View, Text } from 'react-native'

export default function Home({navigation}){
    return(
        <View
        style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>  {/*style helps to locate the text in the centre of the screen */}
            <Text>Home Screen</Text> {/* this will populate text named home on the hompe page  - comment by Srushti */}
        </View>
    )
}