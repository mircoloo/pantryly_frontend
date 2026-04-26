import "@/global.css";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
 
export default function App() {
  return (
    <View
  className="flex-1 items-center justify-center bg-background"
  >
      <Text className="text-xl font-bold text-primary">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding" className="mt-4 rounded bg-primary text-white p-4">Go to onboarding</Link>

        <Pressable className="bg-primary active:bg-primary-dark px-4 py-3 rounded-lg">
          <Text className="text-white font-bold text-center">
            Button
          </Text>
        </Pressable>

      <Link href="/sign-in" className="mt-4 rounded bg-primary text-white p-4">Go to signin</Link>

      <Link href="/sign-up" className="mt-4 rounded bg-primary-dark text-white p-4">Go to sign-up</Link>

      <Pressable className="bg-card  px-4 py-3 rounded-lg">
        <Text className="text-white font-semibold text-center">
          Continue
        </Text>
      </Pressable>
      <Pressable className="bg-primary active:bg-primary-dark px-4 py-3 rounded-lg"></Pressable>


      <Link href={{
        pathname: "/subscriptions/[id]",
        params: {"id": "claude"}
      }}>Claude Max Subscription</Link>
    </View>
  );
}