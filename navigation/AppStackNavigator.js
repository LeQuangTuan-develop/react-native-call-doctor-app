import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CallDoctorList from '../screen/CallDoctorList'
import CallBooking from '../screen/CallBooking'
import CallScreen from '../screen/CallScreen'
import AppBottomTap from './AppBottomTap';

const CallStack = createNativeStackNavigator()

function CallStackScreen() {
    return (
        <CallStack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    textAlign: 'center',
                },
                headerStyle: {
                    borderColor: 'white',
                }
            }}
        >
            <CallStack.Screen 
                name="CallHome" 
                component={AppBottomTap} 
                options={{ 
                    title: 'Trang chủ',
                }}
            />
            <CallStack.Screen 
                name="CallDoctorList" 
                component={CallDoctorList} 
            />
            <CallStack.Screen 
                name="CallBooking" 
                component={CallBooking}
                options={{ title: 'Đặt lịch' }} 
            />
            <CallStack.Screen 
                name="CallScreen" 
                component={CallScreen}
                options={{ headerShown: false }} 
            />
        </CallStack.Navigator>
    )
}

export {
    CallStackScreen
}