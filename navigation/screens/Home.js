import { View, Text } from 'react-native'

export default function Home({navigation}){
    return(
        <View
            style={{flex:1, backgroundColor: '#ffdeb7', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
        </View>
        
    )
}