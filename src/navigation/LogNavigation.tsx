import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/LogScreen/Login';
import SignUp from '../screens/LogScreen/SignUp';
import { LogParamTypes } from '../types/LogType';

const LogStack = createNativeStackNavigator<LogParamTypes>();

const LogNavigation = () => {
  return (
    <NavigationContainer>
        <LogStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <LogStack.Screen name="Login" component={Login} />
            <LogStack.Screen name="SignUp" component={SignUp} />
        </LogStack.Navigator>
    </NavigationContainer>
  )
}

export default LogNavigation