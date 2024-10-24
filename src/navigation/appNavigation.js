import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import SaleDetails from '../screens/SaleDetails';
import SaleForm from '../screens/SaleForm';
import TabScreen from './Tabnav';
import { HeaderBackButton } from '@react-navigation/elements';
import COLORS from '../conts/colors';
import { ShopProvider } from '../screens/ShopContext';
import { SaleProvider } from '../screens/SaleContext';
import Loader from '../components/Loader';
import TransportForm from '../screens/TransportForm';
import PurchaseForm from '../screens/PurchaseForm';
import ChooseLocation from '../screens/ChooseLocation';
import Home from '../screens/Home';


const Stack = createNativeStackNavigator();


export default function AppNavigation({ navigation }) {


    const [initialRouteName, setInitialRouteName] = React.useState('');

    React.useEffect(() => {
        setTimeout(() => {
            authUser();
        }, 2000);
    }, []);


    const backButtonHandler = () => {
        navigation.navigate('Dashboard');
    };

    const renderHeaderBackButton = () => {
        return (
            <HeaderBackButton
                onPress={backButtonHandler}
                tintColor="#000"
            />
        );
    };

    const authUser = async () => {
        try {

            let userData = await AsyncStorage.getItem('userData');

            if (userData) {
                userData = JSON.parse(userData);
                if (userData.loggedIn) {
                    setInitialRouteName('home');
                } else {
                    setInitialRouteName('LoginScreen');
                }
            } else {
                setInitialRouteName('RegistrationScreen');
            }
        } catch (error) {
            setInitialRouteName('RegistrationScreen');
        }
    };


    return (

        <ShopProvider>
            <SaleProvider>
                <NavigationContainer>
                    {!initialRouteName ? (
                        <Loader visible={true} />
                    ) : (
                        <>

                            <Stack.Navigator initialRouteName='Welcome'
                                screenOptions={{
                                    headerShown: true,
                                    swipeEnabled: true,
                                    gestureEnabled: true,
                                    headerTitleAlign: 'center',
                                    unmountOnBlur: true,
                                    headerStyle: {
                                        backgroundColor: COLORS.orange,
                                    },
                                    headerTintColor: '#ffffff',
                                    headerTitleStyle: {
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    },
                                }}>

                                <Stack.Screen name="SaleForm" options={{ headerShown: true }} component={SaleForm} />

                                <Stack.Screen name="TransportForm" options={{ headerShown: true }} component={TransportForm} />

                                <Stack.Screen name="PurchaseForm" options={{ headerShown: true }} component={PurchaseForm} />

                                <Stack.Screen name="SaleDetails" options={{ headerShown: true }} component={SaleDetails} />

                                <Stack.Screen name="Welcome" options={{ headerShown: false }} component={TabScreen} />

                                <Stack.Screen name="Login" options={{ headerShown: true }} component={LoginScreen} />

                                <Stack.Screen name="Registration" options={{ headerShown: true }} component={RegistrationScreen} />

                                <Stack.Screen name="home" options={{ headerShown: true }} component={Home} />

                                <Stack.Screen name="chooseLocation" options={{ headerShown: true }} component={ChooseLocation} />

                            </Stack.Navigator>
                            <FlashMessage
                                position="top"
                            />

                        </>
                    )}
                </NavigationContainer >
            </SaleProvider >
        </ShopProvider>
    )
};