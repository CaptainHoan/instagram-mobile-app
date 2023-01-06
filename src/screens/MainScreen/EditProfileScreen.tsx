import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const EditProfileScreen = () => {

  const navigation = useNavigation()
  const currentUser = auth.currentUser

  //check if user is null
  if(currentUser === null) return  

  const [profilePic, setProfilePic] = useState<string>('https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720')
  const [username, setUserName] = useState<string>('')
  const [bio, setBio] = useState<string>('')

  // pick image from mobile
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }

  };

  //update user Profile to firebase
  const updateProfile = async() => {
    if(username.length > 0 && bio.length > 0) {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        username: username,
        user_bio: bio,
        profilePicture: profilePic,
        timestamp: serverTimestamp()
      })
      .then(() => navigation.goBack())
      .catch(error => console.log(error))
    }
  }

  return (
    <SafeAreaView>
      <View className='flex-row items-center mx-5 mt-4 justify-between'>
        <View className='flex-row items-center space-x-5'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className='font-semibold text-lg'>Edit profile</Text>
        </View>
        <TouchableOpacity onPress={updateProfile}>
          <AntDesign name="check" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <View className='mt-10 self-center'>
        <TouchableOpacity onPress={pickImage}>
          <Image
            className='rounded-full' style={{width: 100, height: 100}}
            source={{uri: profilePic}}
          />
        </TouchableOpacity>
      </View>
      <Text className='text-center mt-4 text-xl font-semibold text-blue-500'>
        Change profile photo
      </Text>

      <View className='mt-8'>
        <View className='p-3 border-b-2 border-slate-400 mx-5'>
          <TextInput 
            placeholder='Your username'
            placeholderTextColor={'gray'}
            value={username}
            onChangeText={setUserName}
            className="text-lg"
          />
        </View>
        <View className='p-3 border-b-2 border-slate-400 mx-5'>
          <TextInput 
            placeholder='Your bio'
            placeholderTextColor={'gray'}
            multiline={true}
            value={bio}
            onChangeText={setBio}
            className="text-lg"
          />
        </View>
      </View>
      <Text className="font-semibold text-blue-400 text-lg mt-5 mx-5">Switch to Professional account</Text>
      <Text className="font-semibold text-blue-400 text-lg mt-5 mx-5">Personal information settings</Text>
    </SafeAreaView>
  )
}

export default EditProfileScreen