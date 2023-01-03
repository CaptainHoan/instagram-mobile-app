import { View, Text, Button } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';

const MainStack = createNativeStackNavigator()

const MainNavigation = () => {

  const signOutUser = async() => {
    await signOut(auth)
    .then (() => {
      //signOut user
    })
    .catch(err => console.log(err.message))
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Group>
          <MainStack.Screen name="Bottom" component={BottomNavigator} />
        </MainStack.Group>
      </MainStack.Navigator>
      
    </NavigationContainer>
  )
}

export default MainNavigation