import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
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
          alignContent: 'center'
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="fasting"
        options={{
          title: "Jejum",
          headerTitle: "JEJUM FÁCIL",
          headerTitleStyle: { fontWeight: "bold", color: "black", fontSize: 24 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Diário",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-edit" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Painel",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="google-analytics" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}