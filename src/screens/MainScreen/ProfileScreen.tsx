import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import { AUTH_USER_PROFILE } from '../../types/currentUserType'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {

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
      setProfile(profile)
    })  
  ,[])

  console.log(profile)

  return (
    <SafeAreaView>
      <View className='flex-row items-center justify-between mx-4'>
        <Text className='text-black text-2xl font-semibold'>
          {profile[0]?.username}
        </Text>
        <View className='flex-row items-center space-x-5'>
          <TouchableOpacity>
            <Ionicons name="create-sharp" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="bars" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
      </View>
      <View>
          <Image
            source={{uri: profilePic}}
            className='w-20 h-20 rounded-full'
          />
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen