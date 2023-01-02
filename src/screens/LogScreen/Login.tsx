import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Login = () => {

  const navigation = useNavigation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signIn = () => {

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
              placeholder='Password'
              placeholderTextColor={'gray'}
              value={password}
              onChangeText={setPassword}
            />
        </View>
        <Text className='text-md font-bold text-blue-400 text-right'>Forgot password?</Text>
      </View>

      <TouchableOpacity className='bg-blue-300 rounded-md p-3 mx-5 mt-8' onPress={signIn}>
        <Text className='text-center font-bold text-white text-lg'>Log In</Text>
      </TouchableOpacity>

      <View className='absolute bottom-7 self-center'>
        <View className='flex-row align-center space-x-1 mt-5'>
          <Text className="text-gray-400 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className='text-blue-400 font-bold'>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default Login