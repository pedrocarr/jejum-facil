import React from "react";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { CardsProvider } from "@/contexts/CardsContext";
import { PlansProvider } from "@/contexts/PlansContext";


export default function RootLayout() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <PlansProvider>
          <CardsProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            </Stack>
          </CardsProvider>
        </PlansProvider>
      </SafeAreaProvider>
    </PaperProvider>
  )
}