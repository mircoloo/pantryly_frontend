import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const memoryStorage = new Map<string, string>();
const isWeb = Platform.OS === "web";
const hasWindow = typeof window !== "undefined";

const storage = {
  async getItem(key: string) {
    if (isWeb && hasWindow) {
      return window.localStorage.getItem(key);
    }

    if (isWeb) {
      return memoryStorage.get(key) ?? null;
    }

    return SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    if (isWeb && hasWindow) {
      window.localStorage.setItem(key, value);
      return;
    }

    if (isWeb) {
      memoryStorage.set(key, value);
      return;
    }

    await SecureStore.setItemAsync(key, value);
  },
  async removeItem(key: string) {
    if (isWeb && hasWindow) {
      window.localStorage.removeItem(key);
      return;
    }

    if (isWeb) {
      memoryStorage.delete(key);
      return;
    }

    await SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
