import { Stack } from "expo-router";


export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#F0F8FF" },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="info"
      options={{
          headerTitle: "Informações",
          headerTitleStyle: { color: "black", fontSize: 24 },
        }}
      />
      <Stack.Screen name="plans"
      options={{
          headerTitle: "Planos de Jejum",
          headerTitleStyle: { color: "black", fontSize: 24 },
        }}
      />
    </Stack>
  )
}