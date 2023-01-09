import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { AUTH_USER_PROFILE, POST_TYPE } from '../../types/currentUserType';
import { Fontisto, Feather, AntDesign   } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const currentUser = auth.currentUser
  //check if user is null
  if(currentUser === null) return 

  const navigation = useNavigation()
  const [loggedInUser, setLoggedInUser] = useState<AUTH_USER_PROFILE[]>([])
  const [posts, setPosts] = useState<POST_TYPE[]>([])
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [postLiked, setPostLiked] = useState<string>('')

  //fetch current user infos
  useEffect(() => 
    onSnapshot(collection(db, 'users'), (snapshot) => {
      const profile = snapshot.docs.filter(doc => doc.id === currentUser.uid).map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setLoggedInUser(profile);
    })  
,[])

  //fetch posts
  useEffect(() => 
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPosts(posts)
    })
  ,[db])

  //fetch Liked
  useEffect(() => 
    onSnapshot(collection(db, 'posts', 'liked'), (snapshot) => {
      const liked = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log('liked is', liked)
      //setIsLiked(liked.liked)
    })
  ,[db])

  //console.log('posts are',posts)
  //handle when post is liked
  const handleLikeFunc = (post: POST_TYPE) => {
    setIsLiked(true)
    setPostLiked(post.id)
    if(isLiked === false) {
      addDoc(collection(db, 'posts', post.id, 'liked'), {
        userWhoLiked: currentUser.uid,
        liked: true,
        timestamp: serverTimestamp()
      })
    }
    if(isLiked === true) return
  }

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
                <TouchableOpacity onPress={() => handleLikeFunc(post)}>
                  <AntDesign 
                    name="heart" 
                    size={24} 
                    color={isLiked === true && postLiked === post.id ? "red" : 'gray'} 
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Comment')}>
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