import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type LogParamTypes = {
    Login: undefined,
    SignUp: undefined
}

export type LogNavigationProp = NativeStackNavigationProp<LogParamTypes, 'Login'>