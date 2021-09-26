import 'react-native-gesture-handler';
import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './context/Authcontext'
import LottieView from 'lottie-react-native';
import { 
  View, 
  StyleSheet,
  StatusBar,  
} from 'react-native'
import { CallStackScreen } from './navigation/AppStackNavigator'
import RootStackScreen from './navigation/RootStackScreen'
import AuthReducer from './context/AuthReducer'

function App() {

  const initialLoginState = {
    isLoading: true,
    phone: null,
    userToken: null,
  }

  const authContext = useMemo(() => ({
    signIn: async (foundUser) => {
      try {
          const userToken = foundUser[0].userToken
          const phone = foundUser[0].phone
          await AsyncStorage.setItem('userToken', userToken)
          dispatch({ type: 'LOGIN', id: phone, token: userToken })
      } catch (error) {
          console.log(error);
      }
    },
    signUp: () => {
        dispatch({ type: 'REGISTER' })
    },
    signOut: async () => {
        try {
            await AsyncStorage.removeItem('userToken')
        } catch (error) {
            console.log(error);
        }
        dispatch({ type: 'LOGOUT' })
    },
  }))

  const [loginState, dispatch] = useReducer(AuthReducer, initialLoginState)

  useEffect(() => {
    setTimeout( async () => {
      let userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (error) {
        console.log(error);
      }

      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    }, 4000)
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
        {/* <ActivityIndicator size="large" color={color.PrimaryColor}/> */}
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <LottieView 
          source={require('./assets/animations/24867-online-doctor-app.json')}
          size={30} 
          autoPlay 
          loop 
        />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {loginState.userToken === null && <RootStackScreen />}
      {loginState.userToken !== null &&
        <CallStackScreen />
      }
    </NavigationContainer>
    </AuthContext.Provider>
  );
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

export default App
