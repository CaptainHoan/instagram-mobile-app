import { View, Text, Button } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const MainNavigation = () => {

  const signOutUser = async() => {
    await signOut(auth)
    .then (() => {
      //signOut user
    })
    .catch(err => console.log(err.message))
  }

  return (
    <View>
      <Button title="sign out" onPress={signOutUser} />
    </View>
  )
}

export default MainNavigation