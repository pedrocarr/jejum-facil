import { Stack } from "expo-router";


export function ScreenLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#F0F8FF" }, headerTitleAlign: 'center', headerShadowVisible: false }}
    >
      <Stack.Screen name="info" options={{ title: "Informações", headerTitleStyle: { fontWeight: "bold", color: "black", fontSize: 24 } }} />
    </Stack>
  )
}