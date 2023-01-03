import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase'
import { doc, setDoc } from 'firebase/firestore'

const SignUp = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userName, setUserName] = useState<string>('')

  const signUp = async() => {
    await createUserWithEmailAndPassword(auth, email, password)
    try{
      //sign Up user
    }catch(err:any) {
      console.log(err.message)
    }
  }

  return (
    <SafeAreaView className='flex-1'>
      
      <View className='self-center'>
        <Image 
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png'}}
          style={{width: 150, height: 150, resizeMode: 'contain'}}
        />
      </View>

      <View className='mx-5 space-y-5'>
        <View className='bg-white rounded-md border-2 border-gray-600 p-3'>
          <TextInput 
            placeholder='Email'
            placeholderTextColor={'gray'}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className='bg-white rounded-md border-2 border-gray-600 p-3'>
          <TextInput 
            placeholder='Username'
            placeholderTextColor={'gray'}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View className='bg-white rounded-md border-2 border-gray-600 p-3'>
          <TextInput 
              placeholder='Password'
              placeholderTextColor={'gray'}
              value={password}
              onChangeText={setPassword}
            />
        </View>
      </View>

      <TouchableOpacity className='bg-blue-300 rounded-md p-3 mx-5 mt-8' onPress={signUp}>
        <Text className='text-center font-bold text-white text-lg'>Sign up</Text>
      </TouchableOpacity>

      <View className='absolute bottom-10 mx-10'>
        <Text className='text-gray-400 font-bold text-lg text-center'>
          By signing up, you agree to our Terms & Privacy Policy
        </Text>
      </View>

    </SafeAreaView>
  )
}

export default SignUp