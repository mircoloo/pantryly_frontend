import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Link href="/(auth)/sign-in">Login account</Link>

      <Link href="/index" className="mt-4 rounded bg-primary text-white p-4"
      style={{backgroundColor: "#005246"}}>Go home</Link>
    </View>
  )
}

export default SignUp