import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{headerStyle: {backgroundColor: "#E8732A"}, headerShown: true, 
                              headerTintColor: "white"}} >
    <Stack.Screen name="(tabs)"/>
  </Stack>;
}
