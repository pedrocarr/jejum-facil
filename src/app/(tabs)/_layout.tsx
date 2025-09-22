import CalendarBottomSheetButton from "@/components/CalendarBottomSheetButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Tabs } from "expo-router";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const router = useRouter();

const showInfo = () => {
  return (
    <TouchableOpacity onPress={() => router.push("/info")} className="mr-4">
      <MaterialCommunityIcons name="information-outline" color="#c0c0c0" size={40} />
    </TouchableOpacity>
  );
}

const showSettings = () => {
  return (
    <TouchableOpacity onPress={() => router.push("/settings")} className="mr-4">
      <MaterialCommunityIcons name="cog-outline" color="#c0c0c0" size={40} />
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#F0F8FF" },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: "#F0F8FF",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            shadowRadius: 0,
          },
          tabBarActiveTintColor: "#6200ee",
          tabBarInactiveTintColor: "#666666",
        }}
      >
        <Tabs.Screen
          name="fasting"
          options={{
            title: "Jejum",
            headerTitle: "MEU JEJUM",
            headerTitleStyle: { fontWeight: "bold", color: "black", fontSize: 24 },
            headerRight: () => showInfo(),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: "Diário",
            headerTitleStyle: { fontSize: 24 },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book-edit" color={color} size={size} />
            ),
            headerRight: () => (
              <CalendarBottomSheetButton
                onPress={() => {
                  if ((global as any).openCalendarBottomSheet) {
                    (global as any).openCalendarBottomSheet();
                  }
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Painel",
            headerTitleStyle: { fontSize: 24 },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="google-analytics" color={color} size={size} />
            ),
            headerRight: () => showSettings(),
          }}
        />
        <Tabs.Screen
          name="support"
          options={{
            title: "Suporte",
            headerTitle: "Suporte",
            headerTitleStyle: { fontSize: 24 },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cellphone-information" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}