import React from 'react';
import { Tabs, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { uid } = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#000000' : '#f7f1eb',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#dba6a1',
        tabBarInactiveTintColor: '#dba6a1',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="diagnosis"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size + 8} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        initialParams={{ uid }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        initialParams={{ uid }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
