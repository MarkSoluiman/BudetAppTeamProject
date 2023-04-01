import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicones from 'react-native-vector-icons/Ionicons'

import Advice from './screens/Advice'
import Goals from './screens/Goals'
import Home from './screens/Home'
import Log from './screens/Log'
import Login from './screens/Login'
import News from './screens/News'
import Profile from './screens/Profile'
import { View , Text } from 'react-native'

const adviceName = 'Advice'
const goalsName = 'Goals'
const homeName = 'Home'
const logName = 'Log'
const loginName = 'Login'
const newsName = 'News'
const profileName = 'Profile'

const Tab = createBottomTabNavigator()


export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarStyle: {paddingBottom: 10},
                    tabBarIcon: ({ focused, color, size}) => {
                        let iconName;
                        let rn = route.name;
                        

                        if (rn === adviceName){
                            iconName = focused ? 'thumbs-up' : 'thumbs-up-outline'
                        } else if (rn === goalsName){
                            iconName = focused ? 'list-circle' : 'list-circle-outline'
                        } else if (rn === homeName){
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === logName){
                            iconName = focused ? 'document-text' : 'document-text-outline'
                        } else if (rn === newsName){
                            iconName = focused ? 'newspaper' : 'newspaper-outline'
                        }

                        return <Ionicones name={iconName} size={size} color={color}/>
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle : { fontSize: 10},
                }}
            >
                <Tab.Screen name={adviceName}  component={Advice}/>
                <Tab.Screen name={newsName} component={News}/>
                <Tab.Screen name={homeName} component={Home}/>
                <Tab.Screen name={logName} component={Log}/>
                <Tab.Screen name={goalsName} component={Goals}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}