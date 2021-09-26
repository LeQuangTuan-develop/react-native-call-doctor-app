import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CallDoctorList from '../screen/CallDoctorList'
import CallBooking from '../screen/CallBooking'
import CallModal from '../screen/CallModal'
import CallScreen from '../screen/CallScreen'
import Appointment from '../screen/Appointment'
import AppBottomTap from './AppBottomTap';
import PostScreen from '../screen/PostScreen';
import { createStackNavigator } from '@react-navigation/stack';

const CallStack = createStackNavigator()

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
            <CallStack.Group>
                <CallStack.Screen 
                    name="CallHome" 
                    component={AppBottomTap} 
                    options={{ headerShown: false }} 
                />
                <CallStack.Screen 
                    name="CallDoctorList" 
                    component={CallDoctorList} 
                />
                <CallStack.Screen 
                    name="CallBooking" 
                    component={CallBooking}
                />
            </CallStack.Group>
            <CallStack.Group>
                <CallStack.Screen 
                    name="PostDetail" 
                    component={PostScreen}
                    options={{
                        title: "Bài viết",
                    }}
                />
            </CallStack.Group>
            <CallStack.Group>
                <CallStack.Screen 
                    name="Appointment" 
                    component={Appointment}
                />
            </CallStack.Group>
            <CallStack.Group screenOptions={{ presentation: "modal"}}>
                <CallStack.Screen 
                    name="CallScreen" 
                    component={CallScreen}
                    options={{ headerShown: false }} 
                />
                <CallStack.Screen 
                    name="CallModal" 
                    component={CallModal}
                />
            </CallStack.Group>
        </CallStack.Navigator>
    )
}

export {
    CallStackScreen
}