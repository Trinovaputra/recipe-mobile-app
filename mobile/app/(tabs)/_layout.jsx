import { useAuth } from '@clerk/clerk-expo'
import { View, Text } from 'react-native'
import { Redirect, Stack, Tabs } from 'expo-router'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

const TabsLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />;
    }
    return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textLight,
            tabBarStyle: {
                backgroundColor: COLORS.white,
                borderTopColor: COLORS.border,
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                height: 80,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
            }
        }}
    >
        <Tabs.Screen 
            name="index"
            options={{
                title: "recipes",
                tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />
            }}
        />
        <Tabs.Screen 
            name="search"
            options={{
                title: "search",
                tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />
            }}
        />
        <Tabs.Screen 
            name="favorites"
            options={{
                title: "favorites",
                tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />
            }}
        />
    </Tabs>);
};

export default TabsLayout