import React from "react";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: true}}></Stack.Screen>
      </Stack>
    </SafeAreaProvider>
  )
}