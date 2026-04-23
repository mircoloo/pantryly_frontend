import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-primary">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding" className="mt-4 rounded bg-primary text-white p-4">Go to onboarding</Link>

      <Link href="/sign-in" className="mt-4 rounded bg-primary text-white p-4">Go to signin</Link>

      <Link href="/sign-up" className="mt-4 rounded bg-primary text-white p-4">Go to sign-up</Link>
    </View>
  );
}