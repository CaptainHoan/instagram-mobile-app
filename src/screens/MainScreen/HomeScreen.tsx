import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { AUTH_USER_PROFILE, POST_TYPE } from '../../types/currentUserType';
import { Feather, AntDesign   } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const currentUser = auth.currentUser
  //check if user is null
  if(currentUser === null) return 

  const navigation = useNavigation()
  const [posts, setPosts] = useState<POST_TYPE[]>([])
  const [loggedInUser, setLoggedInUser] = useState<AUTH_USER_PROFILE[]>([])

  //fetch loggedUser
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

  console.log(posts)

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
                  <TouchableOpacity onPress={() => {
                    if (post.post_id !== currentUser.uid) {
                      navigation.navigate('User')
                    }
                  }}>
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
              <PostFooter 
                navigation={navigation}
                post={post}
                currentUser = {currentUser}
                loggedInUser = {loggedInUser}
              />

              {/**post Bio */}
              <View className='mx-4'>
                <Text className='text-gray-900 text-base '>
                  <Text className='font-bold text-black'>{post?.username} { }</Text> 
                  {post.status}</Text>
              </View>

              <PostComment post={post}/>

              <View className='h-0.5 bg-slate-200'></View>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const PostFooter = ({ post, navigation, currentUser, loggedInUser}: any) => {

  const [isLiked, setIsLiked] = useState<boolean | null>(null)
  const [postLiked, setPostLiked] = useState<string[]>([])

  //if (postLiked === null) return 

  //fetch likes of each post
  useEffect(() => 
    onSnapshot(query(collection(db, 'posts', post.id, 'liked'), where('liked', '==', true)), (snapshot) => {
      const likes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log('likes is', likes)
      setIsLiked(likes[0]?.liked)
      const postLiked = snapshot.docs.map(doc => (
        doc.id
      ))
      setPostLiked(postLiked)
      console.log('postLiked is',postLiked)
    })
  ,[isLiked])

  console.log(isLiked)

  //handle when post is liked
  const handleLikeFunc = (post: POST_TYPE) => {
    setDoc(doc(db, 'posts', post.id, 'liked', currentUser.uid), {
      userWhoLiked: currentUser.uid,
      liked: true,
      timestamp: serverTimestamp()
    })
  }

  return (
    <View>
      <View className='flex-row items-center space-x-3 mx-4 mt-3'>
        <TouchableOpacity onPress={() => handleLikeFunc(post)}>
          <AntDesign 
            name="heart" 
            size={24} 
            color={isLiked === true && postLiked?.includes(currentUser.uid) ? "red" : 'gray'} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Comment', {
            loggedInUser: loggedInUser,
            post: post
          })}
        >
          <Feather name="message-circle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {
        postLiked.length !== 0
        ? (
          <View className='mx-4 mt-2'>
            <Text className='font-semibold'>
              {postLiked?.length > 0 && postLiked.length} {postLiked.length > 1 ? 'likes' : 'like'}
            </Text>
          </View>
        )
        : null
      }
    </View>
  )
}

const PostComment = ({post}: any) => {

  const [comments, setComments] = useState([])

  //fetch comments
  useEffect(() => {
    onSnapshot(query(collection(db, 'posts', post.id, 'comments'), 
    orderBy('timestamp', 'desc')), 
    (snapshot) => {
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setComments(comments)
    })
  },[db])

  return (
    <View className='mx-4 mt-2'>
      {
        comments.length !== 0
        ? (
          <Text className='font-semibold text-gray-500'>
            View {comments.length !== 1 ? 'all' : null} {''}
            {comments.length} {''}
            {comments.length > 1 ? 'comments' : 'comment'}
          </Text>
        )
        : null
      }
    </View>
  )
}

export default HomeScreen