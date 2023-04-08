import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Ionicones from 'react-native-vector-icons/Ionicons'

import Advice from './screens/Advice'
import Goals from './screens/Goals'
import Home from './screens/Home'
import Log from './screens/Log'
import News from './screens/News'
import Login from './screens/Login'
import Profile from './screens/Profile'
import GoalsModal from './screens/GoalsModal'

const adviceName = 'Advice'
const goalsName = 'Goals'
const goalsModalName = 'New Goal'
const homeName = 'Home'
const logName = 'Log'
const newsName = 'News'
const profileName = 'Profile'
const loginName = 'Login'

const HomeStack = createStackNavigator()
function HomeStackScreen(){
    return(
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen name={homeName} component={Home}/>
            <HomeStack.Screen name={profileName} component={Profile}/>
            <HomeStack.Screen name={loginName} component={Login}/>
        </HomeStack.Navigator>
    )
}

const GoalsStack = createStackNavigator()
function GoalsStackScreen(){
    return(
        <GoalsStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <GoalsStack.Screen name={goalsName} component={Goals}/>
            <GoalsStack.Screen name={goalsModalName} component={GoalsModal}/>
        </GoalsStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()
export default function MainContainer(){
    return(
        <NavigationContainer style={{backgroundColor:'#ff8100'}}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    headerStyle: {
                        backgroundColor: '#ff8100',
                    },
                    tabBarStyle: {
                        paddingBottom: 10,
                        paddingTop: 10,
                        backgroundColor: '#ff8100',
                        height: 60,

                    },
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
                    activeTintColor: 'white',
                    inactiveTintColor: '#682d01',
                    labelStyle : { fontSize: 10}
                }}
            >
                <Tab.Screen name={adviceName} component={Advice}/>
                <Tab.Screen name={newsName} component={News}/>
                <Tab.Screen name={homeName} component={HomeStackScreen}/>
                <Tab.Screen name={logName} component={Log}/>
                <Tab.Screen name={goalsName} component={GoalsStackScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
