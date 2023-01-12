import { View, Text, Button } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import EditProfileScreen from '../screens/MainScreen/EditProfileScreen';
import AddPostScreen from '../screens/MainScreen/AddPostScreen';
import CommentScreen from '../screens/MainScreen/CommentScreen';
import UserScreen from '../screens/MainScreen/UserScreen';

const MainStack = createNativeStackNavigator()

const MainNavigation = () => {

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Group>
          <MainStack.Screen name="Bottom" component={BottomNavigator} />
        </MainStack.Group>
        <MainStack.Group>
          <MainStack.Screen name="Edit" component={EditProfileScreen} options={{presentation: 'fullScreenModal'}}/>
          <MainStack.Screen name="ADD" component={AddPostScreen} />
          <MainStack.Screen name="Comment" component={CommentScreen} />
        </MainStack.Group>
        <MainStack.Group>
          <MainStack.Screen name="User" component={UserScreen} />
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation