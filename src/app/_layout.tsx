import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack 
            screenOptions={{
              headerStyle: {backgroundColor: "#E8732A"}, 
              headerShown: false,
              animation: "slide_from_right",
              headerTintColor: "white"}} >
    <Stack.Screen name="(tabs)"/>
  </Stack>;
}
