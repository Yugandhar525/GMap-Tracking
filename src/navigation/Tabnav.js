import React from 'react';
import SaleFormData from '../screens/SaleForm';
import SaleDetailsData from '../screens/SaleDetails';
import DashboardScreen from '../screens/Dashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PurchaseForm from '../screens/PurchaseForm';

import COLORS from '../conts/colors';
import TransportForm from '../screens/TransportForm';

const Tab = createBottomTabNavigator();


const TabScreen = () => {

    return (

        <Tab.Navigator initialRouteName='Welcome'
            screenOptions={{
                headerShown: false,
                headerTitleAlign: 'center',
                unmountOnBlur: true,
                headerStyle: {
                    backgroundColor: COLORS.deepred,
                },
                headerTintColor: '#ffffff',
            }}>

            <Tab.Screen
                name="Home"
                component={DashboardScreen}
                options={{
                    headerShown: true,
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="home"
                            size={focused ? 25 : 20}
                            color={focused ? '#0080ff' : '#999999'}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="SaleForm"
                component={SaleFormData}
                options={{
                    title: 'Add Sale',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 16,
                        fontWeight: 'bold'
                    },
                    headerShown: true,
                    tabBarLabel: 'Sale Form',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="offer" size={focused ? 25 : 20}
                            color={focused ? '#0080ff' : '#999999'} />
                    ),
                }}
            />

            <Tab.Screen
                name="purchase"
                component={PurchaseForm}
                options={{
                    title: 'Add Purchase',
                    headerShown: true,
                    tabBarLabel: 'Purchase',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5 name="shopping-cart" size={focused ? 25 : 20}
                            color={focused ? '#0080ff' : '#999999'} />
                    ),
                }}
            />

            <Tab.Screen
                name="Transport"
                component={TransportForm}
                options={{
                    headerShown: true,
                    tabBarLabel: 'Transport Details',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5 name="truck" size={focused ? 25 : 20}
                            color={focused ? '#0080ff' : '#999999'} />
                    ),
                }}
            />

        </Tab.Navigator>

    );
};

export default TabScreen;

