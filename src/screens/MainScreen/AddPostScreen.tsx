import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const AddPostScreen = () => {

    const navigation = useNavigation()
    const [status, setStatus] = useState<string>('')
    const [image, setImage] = useState<string>('https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg')

    //pick image from mobile
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
          setImage(result.assets[0].uri);
        }
    
      };

  return (
    <SafeAreaView className="flex-1 bg-black">
        <View className="flex-row items-center justify-between mx-3 mt-2">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={40} color="white" />
            </TouchableOpacity>
            
            <Text className="font-bold text-white text-xl">New Post</Text>
            <TouchableOpacity>
                <Text className="text-blue-500 font-bold text-lg">Share</Text>
            </TouchableOpacity>
        </View>
        <View className="mt-3 mx-3 flex-row items-start space-x-3">
            <TouchableOpacity className="ml-2" onPress={pickImage}>
                <Image 
                    source={{uri: image}}
                    style={{width: 100, height: 100}}
                />
            </TouchableOpacity>
            <View className='flex-1'>
                <TextInput 
                    placeholder='Write a caption...'
                    placeholderTextColor={'gray'}
                    multiline={true}
                    value={status}
                    onChangeText={setStatus}
                    style={{
                        color: 'white'
                    }}
                />
            </View>
        </View>

        <View className='mt-6'>
            <TouchableOpacity className="flex-row items-center justify-between mx-3">
                <Text className="text-white text-lg font-semibold">Tag people</Text>
                <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between mx-3 mt-4">
                <Text className="text-white text-lg font-semibold">add location</Text>
                <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between mx-3 mt-4">
                <Text className="text-white text-lg font-semibold">Facebook</Text>
                <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between mx-3 mt-4">
                <Text className="text-white text-lg font-semibold">Twitter</Text>
                <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between mx-3 mt-4">
                <Text className="text-white text-lg font-semibold">Tumbler</Text>
                <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center space-x-1 mx-3 mt-4">
                <Text className="text-gray-400 text-sm font-semibold">advanced settings</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color="gray" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default AddPostScreen