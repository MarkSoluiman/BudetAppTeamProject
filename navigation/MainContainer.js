// Component imports
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Pressable, StyleSheet } from 'react-native'
import Ionicones from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler'
import React from 'react'

// Main screen imports
import Advice from './screens/Advice'
import Goals from './screens/Goals'
import Home from './screens/Home'
import Log from './screens/Log'
import News from './screens/News'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Profile from './screens/Profile'
import ResetPass from './screens/ResetPass'

// Sub screen/modal imports
import GoalsModal from './screens/GoalsModal'
import LogModal from './screens/LogModal'
import HomeBalanceModal from './screens/HomeBalanceModal'
import HomeGoalsModal from './screens/HomeGoalsModal'
import HomeIncomeModal from './screens/HomeIncomeModal'
import HomeSpendingModal from './screens/HomeSpendingModal'
import useAuth from '../hooks/useAuth'

// All screen names initialization
const adviceName = 'Advice'
const goalsName = 'Goals'
const goalsModalName = 'New Goal'
const homeName = 'Home'
const homeBalanceName = 'Current Balance'
const homeGoalsName = 'Goal Bars'
const homeIncomeName = 'Monthly Income'
const homeSpendingName = 'Monthly Spending'
const logName = 'Log'
const logModalName = 'New Transaction'
const newsName = 'News'
const profileName = 'Profile'
const loginName = 'Login'
const signUpName = 'Sign Up'
const resetName = 'Reset Password'

// Login navigation, initial navigation accessed: login, sign up, reset password and home (access to the full application)
const LoginStack = createStackNavigator()
export default function LoginStackScreen(){
    const {user} = useAuth();
    if(user){

        // When the user has logged in, we don't want them to see login and sign up page 
        return(
            <NavigationContainer>
                <LoginStack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <LoginStack.Screen name={homeName} component={MainContainer}/>
                </LoginStack.Navigator>
            </NavigationContainer>
        )
    } else {

        // When the user has logged out, we won't be showing home screen 
        return(
            <NavigationContainer>
                <LoginStack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <LoginStack.Screen name={loginName} component={Login}/>
                    <LoginStack.Screen name={signUpName} component={SignUp}/>
                    <LoginStack.Screen name={resetName} component={ResetPass}/>
                </LoginStack.Navigator>
            </NavigationContainer>
        )
    }
}

// Home screen navigation: homescreen, profile, and data visualisation modals
const HomeStack = createStackNavigator()
function HomeStackScreen(){
    return(
        <HomeStack.Navigator>
            <HomeStack.Group
                screenOptions={{
                    headerShown: false
                }}
            >
                <HomeStack.Screen name={homeName} component={Home}/>
                <HomeStack.Screen name={profileName} component={Profile}/>
                <HomeStack.Screen name={homeBalanceName} component={HomeBalanceModal}/>
                <HomeStack.Screen name={homeGoalsName} component={HomeGoalsModal}/>
                <HomeStack.Screen name={homeIncomeName} component={HomeIncomeModal}/>
                <HomeStack.Screen name={homeSpendingName} component={HomeSpendingModal}/>
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

// Goal screen navigation: goals page and goal entry modal
const GoalsStack = createStackNavigator()
function GoalsStackScreen(){
    return(
        <GoalsStack.Navigator 
            initialRouteName={goalsName}
            screenOptions={{headerShown: false}}
        >
            <GoalsStack.Screen name={goalsName} component={Goals}/>
            <GoalsStack.Screen name={goalsModalName} component={GoalsModal}/>
        </GoalsStack.Navigator>
    )
}

// Log screen navigation: log page and log entry modal
const LogStack = createStackNavigator()
function LogStackScreen(){
    return(
        <LogStack.Navigator 
            initialRouteName={logName}
            screenOptions={{headerShown: false}}
        >
            <LogStack.Screen name={logName} component={Log}/>
            <LogStack.Screen name={logModalName} component={LogModal}/>
        </LogStack.Navigator>
    )
}

// Main container navigation, uses bottom tab to access other navigation structures: advice, news, home, log, and goals
const Tab = createBottomTabNavigator()
function MainContainer(){
    const navigation = useNavigation();
    
    // returned function
    return(
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
                    height: 60
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
                labelStyle: { fontSize: 10 }
            }}
        >
            {/* Advice pages */}
            <Tab.Screen name={adviceName} component={Advice} options={() => ({
                headerRight: () => (
                    <Pressable 
                        style={styles.headerButton} 
                        onPress={()=> navigation.navigate(profileName)}
                    >
                        <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                    </Pressable>
                )
            })}/>

            {/* News */}
            <Tab.Screen name={newsName} component={News} options={() => ({
                headerRight: () => (
                    <Pressable 
                        style={styles.headerButton} 
                        onPress={()=> navigation.navigate(profileName)}
                    >
                        <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                    </Pressable>
                )
            })}/>

            {/* Home */}
            <Tab.Screen name={homeName} component={HomeStackScreen} options={() => ({
                headerRight: () => (
                    <Pressable 
                        style={styles.headerButton} 
                        onPress={()=> navigation.navigate(profileName)}
                    >
                        <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                    </Pressable>
                )
            })}/>

            {/* Transaction pages */}
            <Tab.Screen name={logName} component={LogStackScreen} options={() => ({
                headerRight: () => (
                    <Pressable 
                        style={styles.headerButton} 
                        onPress={()=> navigation.navigate(profileName)}
                    >
                        <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                    </Pressable>
                )
            })}/>

            {/* Goals pages */}
            <Tab.Screen name={goalsName} component={GoalsStackScreen} options={() => ({
                headerRight: () => (
                    <Pressable 
                        style={styles.headerButton} 
                        onPress={()=> navigation.navigate(profileName)}
                    >
                        <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                    </Pressable>
                )
            })}/>
        </Tab.Navigator>
    )
}

//styling for profile icons in top header
const styles = StyleSheet.create ({
    headerButton:{
       marginRight:15
    }

})
