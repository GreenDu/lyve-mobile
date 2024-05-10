import React from "react";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import FloatingButton from "../../../components/FloatingButton";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#676D75",
        headerShown: false,
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 110,
          borderWidth: 0,
          borderColor: "#151718",
          borderTopColor: "#151718",
          backgroundColor: "#151718",
          paddingHorizontal: 16
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "300",
          marginBottom: 20
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="home" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="search" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="stream"
        options={{
          tabBarButton: ({ onPress }) => <FloatingButton onPress={onPress} />
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="bell" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="user" color={color} />
          )
        }}
      />
    </Tabs>
  );
}
