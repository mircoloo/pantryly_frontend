import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export default function Profile() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.helloWorldTitle}>Profile Page</Text>
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
