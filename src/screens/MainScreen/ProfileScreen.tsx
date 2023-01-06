import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import { AUTH_USER_PROFILE } from '../../types/currentUserType'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5, AntDesign, Feather  } from '@expo/vector-icons';

const ProfileScreen = ({navigation}: {navigation: any}) => {

  const currentUser = auth.currentUser

  //check if user is null
  if(currentUser === null) return 

  const [profile, setProfile] = useState<AUTH_USER_PROFILE[]>([])
  const [profilePic, setProfilePic] = useState<string>('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8zaXQFY2XI7H0QGiQlXGJAdcUMh0MFlmnUQ&usqp=CAU')

  useEffect(() => 
    onSnapshot(collection(db, 'users'), (snapshot) => {
      const profile = snapshot.docs.filter(doc => doc.id === currentUser.uid).map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProfile(profile);
      setProfilePic(profile[0]?.profilePicture)
    })  
  ,[])

  console.log(profile)

  return (
    <SafeAreaView>

      <View className='flex-row items-center justify-between mx-4 mt-4'>
        <Text className='text-black text-2xl font-semibold'>
          {profile[0]?.username}
        </Text>
        <View className='flex-row items-center space-x-5'>
          <TouchableOpacity onPress={() => navigation.navigate('ADD')}>
            <Feather name="plus-square" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="bars" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-start justify-between mx-5 mt-5">
        <View className='border-4 rounded-full border-sky-400'>
          <Image
            source={{uri: profilePic}}
            className='w-20 h-20 rounded-full'
          />
          <View className='absolute bottom-0 bg-blue-600 rounded-full right-0'>
            <AntDesign name="plus" size={15} color="white" />
          </View>
        </View>
          
          <View>
            <View className="flex-row items-center justify-between space-x-7">
              <View>
                <Text className='text-center font-bold'>0</Text>
                <Text className='font-semibold'>post</Text>
              </View>
              <View>
                <Text className='text-center font-bold'>0</Text>
                <Text className='font-semibold'>follower</Text>
              </View>
              <View>
                <Text className='text-center font-bold'>0</Text>
                <Text className='font-semibold'>following</Text>
              </View>
            </View>

            <TouchableOpacity className="bg-gray-300 p-3 rounded-lg mt-3"
              onPress={() => navigation.navigate('Edit')}
            >
              <Text className="text-center font-bold">Edit profile</Text>
            </TouchableOpacity>

          </View>
      </View>

      <View className='mt-3 ml-5 mr-10 space-x-10 ' style={{width: 255}}>
        <Text className='font-semibold text-sm'>
          {profile[0]?.user_bio}
        </Text>
      </View>

      <View className='h-1 bg-gray-200 mt-4'></View>

       {/**posts goes here */}
      <View>
        
      </View>


    </SafeAreaView>
  )
}

export default ProfileScreen