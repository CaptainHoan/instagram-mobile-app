import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, {useState, useEffect, useMemo} from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../../firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

const {width, height}: {width: number, height: number} = Dimensions.get('screen')

const UserScreen = ({route}: any) => {

    const {post, loggedInUser} = route.params
    const navigation = useNavigation()
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const [isFollowed, setIsFollowed] = useState<boolean | null>(null)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [followerId, setFollowerId] = useState<string>('')

    //fetch profile user
    useEffect(() => 
        onSnapshot(collection(db, 'users'), 
        (snapshot) => {
            const user = snapshot.docs.filter(doc => doc.id === post.post_id).map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setUser(user)
        })
    , [db])
    
    //fetch posts of such profile user
    useEffect(() => 
        onSnapshot(query(collection(db, 'posts'), 
        orderBy('timestamp', 'desc')), 
        (snapshot) => {
            const posts = snapshot.docs.filter(doc => 
                doc.data().post_id === user[0]?.id).map(doc => ({
                ...doc.data()
            }))
            setPosts(posts)
        })
    , [db, posts])

      //fetch followers
    useMemo(() => {
        if (user.length > 0) {
            onSnapshot(collection(db, 'users', user[0]?.id, 'followers'), (snapshot) => {
                const followers = snapshot.docs.map(doc => ({
                    ...doc.data()
                }))
                setFollowers(followers)
                setFollowerId(followers[0].id)
                setIsFollowed(followers[0].isFollowed)
            })
            onSnapshot(collection(db, 'users', user[0]?.id, 'followings'), (snapshot) => {
                const followings = snapshot.docs.map(doc => doc.id)
                setFollowing(followings)
            })
        }
    },[db, user])

    // function to follow
    const handleFollowFunc = () => {
        setIsFollowed(true)

        addDoc(collection(db, 'users', user[0]?.id, 'followers'), {
            id: loggedInUser[0]?.id,
            profilePicture: loggedInUser[0]?.profilePicture,
            username: loggedInUser[0]?.username,
            isFollowed: true,
            timestamp: serverTimestamp()
        })
        addDoc(collection(db, 'users', loggedInUser[0]?.id, 'followings'), {
            id: user[0]?.id,
            profilePicture: user[0]?.profilePicture,
            username: user[0]?.username,
            timestamp: serverTimestamp()
        })
    }

  return (
    <SafeAreaView className="flex-1">
        <View className='flex-row items-center justify-between mx-3'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={35} color="black" />
            </TouchableOpacity>
            <Text className='font-bold text-lg'>{post.username}</Text>
            <Text className='font-bold text-2xl mb-2'>. . .</Text>
        </View>

        <ScrollView>
            <View className="flex-row items-center justify-between mx-5 mt-5">
                <View className='border-4 rounded-full border-sky-400'>
                    <Image 
                        source={{uri: post.profilePicture}}
                        className='rounded-full' style={{width: 80, height: 80}}
                    />
                </View>
                <View>
                    <View className="flex-row items-center justify-between space-x-7">
                        <View>
                            <Text className='text-center font-bold'>{posts.length}</Text>
                            <Text className='font-semibold'>{posts.length > 1 ? 'posts' : 'post'}</Text>
                        </View>
                        <View>
                            <Text className='text-center font-bold'>{followers.length}</Text>
                            <Text className='font-semibold'>{followers.length > 1 ? 'followers' : 'follower'}</Text>
                        </View>
                        <View>
                            <Text className='text-center font-bold'>{following.length}</Text>
                            <Text className='font-semibold'>{following.length > 1 ? 'followings' : 'following'}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className='mt-3 ml-5 mr-10 space-x-10 ' style={{width: 255}}>
                <Text className='font-semibold text-sm'>{user[0]?.user_bio}</Text>
            </View>
        
            {/**following, followers */}
            <View className="flex-row items-center mx-5 mt-5 space-x-2 ">
                <TouchableOpacity 
                    className=' px-10 py-2 rounded-2xl'
                    style={{
                        backgroundColor: isFollowed === true 
                        && followerId === loggedInUser[0]?.id 
                        ? 'black' 
                        : '#4A90E2'}}
                    onPress={handleFollowFunc}
                >
                    <Text 
                        className='text-center font-bold text-sm text-white'
                    >
                        {
                            isFollowed === true 
                            && followerId === loggedInUser[0]?.id 
                            ? 'following' 
                            : 'follow'
                        }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-black px-12 py-2 rounded-2xl'>
                    <Text className='text-center font-bold text-sm text-white'>Message</Text>
                </TouchableOpacity>
            </View>

            <View className='h-0.5 bg-gray-300 mt-4'></View>

            <View style={{flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
                { 
                    posts.map((post, index) => (
                        <TouchableOpacity key={index} activeOpacity={0.8}>
                            <View >
                                <Image 
                                    source={{uri: post?.image}}
                                    style={{height: width / 3, width: width / 3, resizeMode: 'cover'}}
                                />
                            </View>
                            
                            <View className='h-0.5 bg-black'></View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default UserScreen