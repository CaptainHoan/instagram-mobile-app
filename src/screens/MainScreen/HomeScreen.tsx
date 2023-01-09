import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { POST_TYPE } from '../../types/currentUserType';
import { Fontisto, Feather  } from '@expo/vector-icons';

const HomeScreen = () => {

  const [posts, setPosts] = useState<POST_TYPE[]>([])

  useEffect(() => {
    onSnapshot(collection(db, 'posts'), (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPosts(posts)
    })
  },[db])

  console.log('posts are',posts)

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row items-center justify-between'>
        <Image 
          style={{width: 150, height: 40, resizeMode: 'contain'}}
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png'}}
        />
        <View className='flex-row items-center space-x-4 mr-4'>
          <TouchableOpacity>
            <FontAwesome5 name="heart" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="facebook-messenger" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

       {/** posts*/}
       <ScrollView className='space-y-4 mt-4'>
        {
          posts.map((post, index) => (
            <View key={index} className="space-y-2">
              
              <View className='flex-row items-center justify-between mx-4'>
                <View className='flex-row items-center space-x-3'>
                  <TouchableOpacity>
                    <Image
                      source={{uri: post?.profilePicture}}
                      style={{width: 35, height: 35}} className="rounded-full" 
                    />
                  </TouchableOpacity>
                  <Text className="font-semibold text-lg ">{post?.username}</Text>
                </View>
                <Text className='font-bold'>. . .</Text>
              </View>

              {/**post image  */}
              <View>
                <Image 
                  source={{uri: post?.image}}
                  style={{height: 350, width: '100%', resizeMode: "cover"}}
                />
              </View>

              {/**likes, comments icon */}
              <View className='flex-row items-center space-x-3 mx-4'>
                <TouchableOpacity>
                  <FontAwesome5 name="heart" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="message-circle" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="send" size={24} color="black" />
                </TouchableOpacity>
              </View>

              {/**post Bio */}
              <View className='mx-4'>
                <Text className='text-gray-900 text-base '>
                  <Text className='font-bold text-black'>{post?.username} { }</Text> 
                  {post.status}</Text>
              </View>

              {/**likes, comments  */}
              <View>

              </View>

              <View className='h-0.5 bg-slate-200'></View>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen