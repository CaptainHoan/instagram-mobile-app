import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ScrollView, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback
} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ionicons, Feather  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const {width} = Dimensions.get('screen')

const CommentScreen = ({route}: any) => {

  const navigation = useNavigation()

  const {loggedInUser, post} = route.params

  const [comment, setComment] = useState<string>('')
  const [comments, setComments] = useState([])

  const postComment = () => {
    addDoc(collection(db, 'posts', post.id, 'comments'), {
      comment_username: loggedInUser[0].username,
      comment_profilePicture: loggedInUser[0].profilePicture,
      comment: comment,
      comment_id: loggedInUser[0].id,
      timestamp: serverTimestamp()
    })
    setComment("")
  }

  useEffect(() => {
    onSnapshot(query(collection(db, 'posts', post.id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setComments(comments)
    })
  },[db])

  return (
    <SafeAreaView className='flex-1'>

      <View className='flex-row items-center justify-between mx-3'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={35} color="black" />
        </TouchableOpacity>
        <Text className='text-base font-bold'>Comments</Text>
        <TouchableOpacity>
          <Feather name="send" size={27} color="black" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback>
          <ScrollView>
            {/**user post */}
            <View className='mx-3 flex-row items-start space-x-2 mt-3'>
              <Image 
                source={{uri: post.profilePicture}}
                className="h-10 w-10 rounded-full"
              />
              <View>
                <Text className='font-bold text-base'>{post.username}</Text>
                <Text className='' style={{width: width * 3/4}}>{post.status}</Text>
              </View>  
            </View>

            <View className='h-0.5 bg-zinc-200 mt-4'></View>

            <View className='mx-3 mt-3 space-y-2'>
              {comments.map((comment, index) => (
                <View key={index} className='flex-row items-start space-x-2'>
                  <Image 
                    source={{uri: comment.comment_profilePicture}}
                    className="h-10 w-10 rounded-full"
                  />
                  <Text >
                    <Text className='text-base font-semibold'>
                      {comment.comment_username} {' '} 
                    </Text>
                    {comment.comment}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        

            {/** comment input*/}
            <View className='flex-row items-center mx-2 mb-2'>
              <Image 
                source={{uri: loggedInUser[0].profilePicture}}
                className="h-10 w-10 rounded-full"
              />
              <View 
                className="border-2 border-gray-400 flex-row items-center justify-between pr-4 pl-3 rounded-2xl flex-1 ml-2"
              >
                <View className='flex-1'>
                  <TextInput 
                    className=' text-black text-base flex-1 '
                    placeholder='Add a comment...'
                    placeholderTextColor={'gray'}
                    value={comment}
                    onChangeText={setComment}
                    onSubmitEditing={postComment}
                    multiline={true}
                  />
                </View>
                <TouchableOpacity onPress={postComment}>
                  <Text className="font-bold text-base text-blue-600">Post</Text>
                </TouchableOpacity>
              </View>
            </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView> 
  )
}

export default CommentScreen