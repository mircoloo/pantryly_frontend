
import { Button } from "@react-navigation/elements";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";


import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.helloWorldTitle}>CIAOOOO</Text>
      <Image 
        source={ {uri: "https://media.tenor.com/HHZOPnpoWPMAAAAM/why-you-lying.gif"}}
        style={styles.image}
      />
      <TextInput placeholder="Email"></TextInput>
      <ActivityIndicator size={"large"}></ActivityIndicator>
      <Link href={"/about"}>Go to about page</Link> 
      <Button onPress={() => router.push("/about")}>
        About
      </Button>
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
  }
});
