import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.helloWorldTitle}>CIAOOOO</Text>
      <Image
        source={{
          uri: "https://media.tenor.com/HHZOPnpoWPMAAAAM/why-you-lying.gif",
        }}
        style={styles.image}
      />
      <TextInput placeholder="E-mail"></TextInput>
      <ActivityIndicator size={"large"}></ActivityIndicator>
      <Link href={"/about"}>Go to about page</Link>
      {Platform.OS === "android" ? (
        <Button title="Scanner Andr" onPress={() => router.push("/scanner")} />
      ) : (
        <Button title="Scanner IOS" onPress={() => router.push("/scanner")} />
      )}
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
    color: "#E8732A",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
  },
});
