import * as SecureStore from 'expo-secure-store';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

const AUTH_TOKEN_KEY = 'pantryly.auth.token';
const LOGIN_URL = 'http://localhost:8080/api/v1/auth/login';

type LoginCredentials = {
  username: string;
  password: string;
};

type LoginResponse = {
  access_token?: string;
  token_type?: string;
};

type AuthContextValue = {
  token: string | null;
  isReady: boolean;
  login: (credentials: LoginCredentials) => Promise<string>;
  logout: () => Promise<void>;
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function readToken() {
  if (Platform.OS === 'web') {
    return globalThis.localStorage.getItem(AUTH_TOKEN_KEY);
  }

  return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}

async function saveToken(token: string) {
  if (Platform.OS === 'web') {
    globalThis.localStorage.setItem(AUTH_TOKEN_KEY, token);
    return;
  }

  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

async function clearToken() {
  if (Platform.OS === 'web') {
    globalThis.localStorage.removeItem(AUTH_TOKEN_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrateToken = async () => {
      const storedToken = await readToken();

      if (isMounted) {
        setToken(storedToken);
        setIsReady(true);
      }
    };

    hydrateToken();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      token,
      isReady,
      login: async (credentials) => {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const result = (await response.json()) as LoginResponse;
        const accessToken = result.access_token;

        if (!accessToken) {
          throw new Error('Login succeeded but no access token was returned');
        }

        await saveToken(accessToken);
        setToken(accessToken);

        return accessToken;
      },
      logout: async () => {
        await clearToken();
        setToken(null);
      },
      authFetch: async (input, init = {}) => {
        const headers = new Headers(init.headers);

        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }

        return fetch(input, {
          ...init,
          headers,
        });
      },
    };
  }, [isReady, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}