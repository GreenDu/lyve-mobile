import FloatingButton from '@components/FloatingButton';
import { Feather } from '@expo/vector-icons';
import useAuth from '@modules/auth/useAuth';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#676D75',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0,
          height: Platform.OS === 'ios' ? '11%' : '8%',
          borderColor: '#151718',
          borderTopColor: '#151718',
          backgroundColor: '#151718',
          paddingHorizontal: 16,
        },

        tabBarItemStyle: {
          marginTop: 5,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
          paddingBottom: 10,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Feather size={size} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Feather size={size} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="start-stream"
        options={{
          tabBarButton: ({ onPress }) => <FloatingButton onPress={onPress} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
          tabBarIcon: ({ color, size }) => <Feather size={size} name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          href: {
            pathname: '/profile/[userid]',
            params: {
              userid: user.id,
            },
          },
          tabBarIcon: ({ color, size }) => <Feather size={size} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
