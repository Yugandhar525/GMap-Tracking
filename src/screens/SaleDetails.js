import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useSaleContext } from './SaleContext';


const SaleDetails = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        });
        return unsubscribe;
    }, [navigation]);


    const getData = async () => {
        try {
            setLoading(true);
            var myHeaders = new Headers();
            myHeaders.append("content-Type", "application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const response = await fetch("http://192.168.0.101:8081/TestMaven/chicken/formlist", requestOptions);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            console.log(jsonData);

            console.log(jsonData);

            setData(jsonData.data);

            AsyncStorage.setItem('data', JSON.stringify(jsonData.data));

        } catch (error) {
            setError("Error fetching data. Please try again.");
            console.error('Error', error);
        } finally {
            setLoading(false);
        }
    };


    const renderData = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#4285f4" />;
        }

        if (!data || data.length === 0) {
            return (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No data available</Text>
                </View>
            );
        }


        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Sale Records</Text>

                        {data.map((item) => (
                            <TouchableOpacity key={item.id}
                                style={styles.saleCard}>
                                <Text style={styles.cardText}>Product: {item.product}</Text>
                                <Text style={styles.cardText}>Amount: {item.amount}</Text>
                                <Text style={styles.cardText}>Quantity: {item.quantity}</Text>
                                <Text style={styles.cardText}>advamount: {item.advamount}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        );
    };

    const renderError = () => (
        <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={getData}>
                <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {error ? renderError() : renderData()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 1,
        paddingHorizontal: 0,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        margin: 20,
    },
    saleCard: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    noDataText: {
        fontSize: 16,
        color: '#666',
    },
    errorCard: {
        margin: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
    retryButton: {
        backgroundColor: '#4285f4',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SaleDetails;
