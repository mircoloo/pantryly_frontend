import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Link href="/(auth)/sign-in">Login account</Link>

      <Link href="/(tabs)" className="mt-4 rounded bg-primary text-white p-4">Go home</Link>
    </View>
  )
}

export default SignUp