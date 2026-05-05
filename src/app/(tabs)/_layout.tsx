import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs screenOptions={{tabBarActiveTintColor: "#E8732A", headerShown: true}}>
    <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ({color, size, focused}) => 
          <Ionicons color={color} size={size}  name={focused ? "home" : "home-outline"}/>}}/>
      <Tabs.Screen name="scanner" options={{title: "Scanner", tabBarIcon: ({color, size, focused}) => 
          <Ionicons color={color} size={size}  name={focused ? "barcode" :"barcode-outline"}/>}}/>
      <Tabs.Screen name="profile" options={{title: "Profile", tabBarIcon: ({color, size, focused}) => 
            <Ionicons color={color} size={size}  name={focused ? "person" :"person-outline"}/>}}/>
      <Tabs.Screen name="about" options={{title: "About", tabBarIcon: ({color, size}) => 
            <Ionicons color={color} size={size}  name="information-circle"/>}}/>
  </Tabs>;
}
