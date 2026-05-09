import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password.length < 3) {
      Alert.alert("Error", "Password must be at least 3 characters");
    }

    try {
      await signUp(email, password);
    } catch (error) {
      Alert.alert("Error", "Failed to Sign Up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const router = useRouter();
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subTitle}>Sign Up to Get Started</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Email..."
            placeholderTextColor={"#999"}
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            placeholder="Password..."
            placeholderTextColor={"#999"}
            autoComplete="password"
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            {isLoading ? (
              <ActivityIndicator size={24} color={"#fff"}></ActivityIndicator>
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => {
              router.push("/(auth)/login");
            }}
          >
            <Text style={styles.linkButtonText}>
              Already have an account?{" "}
              <Text style={styles.linkButtonTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 32,
    color: "#666",
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#E8732A",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
  linkButton: {
    marginTop: 24,
    alignItems: "center",
  },
  linkButtonText: {
    color: "#666",
    fontSize: 14,
  },
  linkButtonTextBold: { fontWeight: 600, color: "#E8732A" },
});
