import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/context/auth-context';

export default function LoginScreen() {
  const { login, isReady, token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('mircolo');
  const [password, setPassword] = useState('mircolo');

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const loginData = {
        username,
        password,
      };

      const accessToken = await login(loginData);
      console.log('Stored access token:', accessToken);
      router.replace('/pantry');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.subtleText}>Loading session...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtleText}>
        {token ? 'You already have a saved session.' : 'Use your Pantryly credentials to continue.'}
      </Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Username"
            placeholderTextColor="#64748B"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#64748B"
            style={styles.input}
          />
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable style={styles.primaryButton} onPress={handleLogin} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#F8FAFC" />
        ) : (
          <Text style={styles.primaryButtonText}>{token ? 'Refresh session' : 'Login'}</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtleText: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    gap: 12,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#111827',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 12,
    color: '#F8FAFC',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
});