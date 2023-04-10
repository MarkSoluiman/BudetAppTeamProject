import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Pressable, StyleSheet } from 'react-native'
import Ionicones from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler'

import Advice from './screens/Advice'
import Goals from './screens/Goals'
import Home from './screens/Home'
import Log from './screens/Log'
import News from './screens/News'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Profile from './screens/Profile'

import GoalsModal from './screens/GoalsModal'
import HomeBalanceModal from './screens/HomeBalanceModal'
import HomeGoalsModal from './screens/HomeGoalsModal'
import HomeIncomeModal from './screens/HomeIncomeModal'
import HomePLModal from './screens/HomePLModal'
import HomeSpendingModal from './screens/HomeSpendingModal'

const adviceName = 'Advice'
const goalsName = 'Goals'
const goalsModalName = 'New Goal'
const homeName = 'Home'
const homeBalanceName = 'Current Balance'
const homeGoalsName = 'Goal Bars'
const homeIncomeName = 'Monthly Income'
const homePLName = 'Profit and Loss'
const homeSpendingName = 'Monthly Spending'
const logName = 'Log'
const newsName = 'News'
const profileName = 'Profile'
const loginName = 'Login'
const signUpName = 'Sign Up'

const HomeStack = createStackNavigator()
function HomeStackScreen(){
    return(
        <HomeStack.Navigator>
            <HomeStack.Group
                screenOptions={{
                    headerShown: false
                }}
            >
                <HomeStack.Screen name={loginName} component={Login}/>
                <HomeStack.Screen name={signUpName} component={SignUp}/>
                <HomeStack.Screen name={homeName} component={Home}/>
                <HomeStack.Screen name={profileName} component={Profile}/>
                <HomeStack.Screen name={homeBalanceName} component={HomeBalanceModal}/>
                <HomeStack.Screen name={homeGoalsName} component={HomeGoalsModal}/>
                <HomeStack.Screen name={homeIncomeName} component={HomeIncomeModal}/>
                <HomeStack.Screen name={homePLName} component={HomePLModal}/>
                <HomeStack.Screen name={homeSpendingName} component={HomeSpendingModal}/>
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

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

const Tab = createBottomTabNavigator()
export default function MainContainer(){
    return(
        <NavigationContainer style={{backgroundColor:'#ff8100'}}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route, navigation}) => ({
                    headerStyle: {
                        backgroundColor: '#ff8100'
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
                <Tab.Screen name={adviceName} component={Advice} options={({route, navigation}) => ({
                    headerRight: () => (
                        <Pressable 
                            style={styles.headerButton} 
                            onPress={()=> navigation.navigate('Home', {screen: 'Profile'})}
                        >
                            <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                        </Pressable>)})}/>
                <Tab.Screen name={newsName} component={News} options={({route, navigation}) => ({
                    headerRight: () => (
                        <Pressable 
                            style={styles.headerButton} 
                            onPress={()=> navigation.navigate('Home', {screen: 'Profile'})}
                        >
                            <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                        </Pressable>)})}/>
                <Tab.Screen name={homeName} component={HomeStackScreen} options={({route, navigation}) => ({
                    headerRight: () => (
                        <Pressable 
                            style={styles.headerButton} 
                            onPress={()=> navigation.navigate('Home', {screen: 'Profile'})}
                        >
                            <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                        </Pressable>)})}/>
                <Tab.Screen name={logName} component={Log} options={({route, navigation}) => ({
                    headerRight: () => (
                        <Pressable 
                            style={styles.headerButton} 
                            onPress={()=> navigation.navigate('Home', {screen: 'Profile'})}
                        >
                            <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                        </Pressable>)})}/>
                <Tab.Screen name={goalsName} component={GoalsStackScreen} options={({route, navigation}) => ({
                    headerRight: () => (
                        <Pressable 
                            style={styles.headerButton} 
                            onPress={()=> navigation.navigate('Home', {screen: 'Profile'})}
                        >
                            <Ionicones name='person-circle-outline' size={35} color='#682d01'/>
                        </Pressable>)})}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    headerButton:{
        marginRight: 15
    }
})