import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Views
import Home from '../views/home';
import Item from '../views/item';
import Version from '../views/version';

const TabNav = createBottomTabNavigator();
const StackNav = createNativeStackNavigator();

function HomeStackView() {
    return (
        <StackNav.Navigator initialRouteName="Home">
            <StackNav.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <StackNav.Screen name="Item" component={Item} options={{ title: 'Detalles de la Receta' }} />
        </StackNav.Navigator>
    );
}

function Nav_tabs() {
    return (
        <TabNav.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'blue',
            }}
        >
            <TabNav.Screen
                name="Recetas app"
                component={HomeStackView}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
                }}
            />
            <TabNav.Screen
                name="Version"
                component={Version}
                options={{
                    tabBarLabel: 'Versión',
                    tabBarIcon: ({ color, size }) => <Octicons name="info" size={size} color={color} />,
                }}
            />
        </TabNav.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Nav_tabs />
        </NavigationContainer>
    );
}
