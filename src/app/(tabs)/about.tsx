import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";

export default function About() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.helloWorldTitle}>About page</Text>
      <TextInput placeholder="Email"></TextInput>
      <ActivityIndicator size={"large"}></ActivityIndicator>
      <Button onPress={() => router.push("/(tabs)")}>Go Home</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  helloWorldTitle: {
    color: "red"
  },
  image: {
    width: 200,
    height: 200,
  }
});
