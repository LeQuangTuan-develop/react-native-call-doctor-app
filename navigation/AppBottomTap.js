import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  TouchableOpacity, 
  StyleSheet, 
  View, 
  Image, 
  Text
} from 'react-native'
import CallHome from '../screen/CallHome'
import Appointment from '../screen/Appointment'
import CallModal from '../screen/CallModal'
import {color} from '../styles/styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      }}
      onPress={onPress}
    >
      <View style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: color.PrimaryColor,
        borderColor: '#ffffff',
        borderWidth: 5
      }}>
        {children}
      </View>
    </TouchableOpacity>
)

const AppBottomTap = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: color.PrimaryColor,
            tabBarInactiveTintColor: color.GrayColor,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#F4F4F4',
              height: 70
            }
          })}
          >
            <Tab.Screen
              name="Home"
              component={CallHome}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tabIcon}>
                    <Ionicons 
                      size={30}
                      name="home" 
                      color={focused ? color.PrimaryColor : color.GrayColor}
                    />
                    <Text style={{color: focused ? color.PrimaryColor : color.GrayColor, fontSize: 12}}>
                      Trang Chủ
                    </Text>
                  </View>
                )
              }}
            />
            <Tab.Screen
              name="Community"
              component={CallHome}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tabIcon}>
                    <Ionicons 
                      size={30}
                      name="earth-sharp" 
                      color={focused ? color.PrimaryColor : color.GrayColor}
                    />
                    <Text style={{color: focused ? color.PrimaryColor : color.GrayColor, fontSize: 12}}>
                      Cộng đồng
                    </Text>
                  </View>
                )
              }}
            />
            <Tab.Screen
              name="Call"
              component={CallModal}
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={require('../assets/phone.png')}
                    resizeMode="contain" 
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: '#ffffff',
                    }}
                  />
                ),
                tabBarButton: (props) => (
                  <CustomTabBarButton {...props} />
                ),
              }}
            />
            <Tab.Screen
              name="Appointment"
              component={Appointment}
              options={{ 
                tabBarIcon: ({focused}) => (
                  <View style={styles.tabIcon}>
                    <Ionicons 
                      size={30}
                      name="calendar-sharp" 
                      color={focused ? color.PrimaryColor : color.GrayColor}
                    />
                    <Text style={{color: focused ? color.PrimaryColor : color.GrayColor, fontSize: 12}}>
                      Lịch Hẹn
                    </Text>
                  </View>
                ),
                tabBarBadge: 3,
              }}
            />
            <Tab.Screen
              name="Account"
              component={Appointment}
              options={{ 
                tabBarIcon: ({focused}) => (
                  <View style={styles.tabIcon}>
                    <FontAwesome 
                      size={30}
                      name="user" 
                      color={focused ? color.PrimaryColor : color.GrayColor}
                    />
                    <Text style={{color: focused ? color.PrimaryColor : color.GrayColor, fontSize: 12}}>
                      Tài khoản
                    </Text>
                  </View>
                ),
              }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabIcon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    shadow: {
      shadowColor: "#7F5DF0",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius:3.5,
      elevation: 5
    }
})

export default AppBottomTap


