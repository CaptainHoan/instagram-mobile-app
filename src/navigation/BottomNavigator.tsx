import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/MainScreen/ProfileScreen';
import HomeScreen from '../screens/MainScreen/HomeScreen'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const BottomStack = createBottomTabNavigator()

const BottomNavigator = () => {
  return (
    <BottomStack.Navigator 
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused}) => {
          if(route.name === 'Home') {
            return <Entypo name="home" size={27} color={focused ? "red" : 'gray'} />
          }
          if(route.name === 'Profile') {
            return <AntDesign name="profile" size={27} color={focused ? "red" : 'gray'} />
          }
        },
        title: () => null
      })}
      initialRouteName="Profile"
    >
      <BottomStack.Screen name='Home' component={HomeScreen} />
      <BottomStack.Screen name='Profile' component={ProfileScreen} />
    </BottomStack.Navigator>
  )
}

export default BottomNavigator