import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'
import LogNavigation from './LogNavigation'
import MainNavigation from './MainNavigation'

const RootStack = () => {

    const [isLogged, setIsLogged] = useState<boolean>(false)

    onAuthStateChanged(auth, (user) => {
        user ? setIsLogged(true) : setIsLogged(false)
    })

  return (
    isLogged === false
    ? <LogNavigation />
    : <MainNavigation />
  )
}

export default RootStack