import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
      <Link href="/(auth)/sign-up">Create account</Link>

      <Link href="/index">Go home</Link>ut
    </View>
  )
}

export default SignIn