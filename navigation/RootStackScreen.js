import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screen/SplashScreen'
import SignUp from '../screen/SignUp'
import SignIn from '../screen/SignIn'

const RootStack = createNativeStackNavigator()

const RootStackScreen = () => {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
            <RootStack.Screen name="SignIn" component={SignIn}/>
            <RootStack.Screen name="SignUp" component={SignUp}/>
        </RootStack.Navigator>
    )
}

export default RootStackScreen