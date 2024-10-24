import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const tabs = [
    { name: 'Sale Record', icon: 'user' },
    { name: 'Purchase Record', icon: 'shopping-cart' },
    { name: 'Transport Record', icon: 'truck' },
];

const DashboardScreen = ({ navigation }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [purchaseRecords, setPurchaseRecords] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const scrollViewRef = React.useRef(null);

    React.useEffect(() => {
        getData();
    }, []);

    const handleScroll = (event) => {

        const contentOffsetX = event.nativeEvent.contentOffset.x;

        const index = Math.round(contentOffsetX / width);

        setActiveIndex(index);
    };

    const scrollToTab = (index) => {
        scrollViewRef.current.scrollTo({
            x: index * width,
            animated: true,
        });
    };


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

            const response = await fetch("http://192.168.0.101:8081/TestMaven/chicken/list", requestOptions);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();

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




    const navigateSale = () => {
        navigation.navigate("SaleForm");
        console.log("pressed")
    }


    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome, Yugi!</Text>
            </View> */}

            <View style={styles.tabs}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => scrollToTab(index)}
                        style={[styles.tab, activeIndex === index && styles.activeTab]}>
                        <FeatherIcon
                            name={tab.icon}
                            size={16}
                            color={activeIndex === index ? '#6366f1' : '#6b7280'}
                        />
                        <Text style={[styles.tabText, activeIndex === index && styles.activeTabText]}>
                            {tab.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {/*Sale Record tab */}
                <View style={{ width, justifyContent: 'space-between' }}>
                    <View>
                        {activeIndex === 0 && (
                            <View style={styles.card}>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.label}>Total Sale:</Text>
                                    <Text style={styles.value}>{'\u20B9'} 0</Text>
                                </View>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.label}>Outstanding Amount:</Text>
                                    <Text style={styles.value}>{'\u20B9'} 0</Text>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Name</Text>
                        <Text style={styles.heading}>Amount</Text>
                    </View>
                    <View style={styles.card}>
                        {data.map((item) => (
                            <TouchableOpacity key={item.id}
                                style={styles.saleCard}>
                                <Text style={styles.cardText}>Product: {item.shopname}</Text>
                                <Text style={styles.cardText}>Amount: {item.amount}</Text>
                                <Text style={styles.cardText}>Quantity: {item.quantity}</Text>
                                <Text style={styles.cardText}>advamount: {item.advamount}</Text>
                                {/* <Text style={styles.cardText}>Timestamp: {item.timestamp.toLocaleString()}</Text> */}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add Sale</Text>
                    </TouchableOpacity>
                </View>

                {/*Purchase Record tab */}
                <View style={{ width, justifyContent: 'space-between' }}>
                    <View>
                        {activeIndex === 1 && (
                            <View style={styles.card}>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.label}>Total Purchase:</Text>
                                    <Text style={styles.value}>{'\u20B9'} 0</Text>
                                </View>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.label}>Outstanding Amount:</Text>
                                    <Text style={styles.value}>{'\u20B9'} 0</Text>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Name</Text>
                        <Text style={styles.heading}>Amount</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={navigateSale}
                    >
                        <Text style={styles.addButtonText}>Add purchase</Text>
                    </TouchableOpacity>
                </View>

                {/*Transport Record tab */}
                <View style={{ width, justifyContent: 'space-between' }}>
                    <View>
                        {activeIndex === 2 && (
                            <View style={styles.card}>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.label}>Total Expenses:</Text>
                                    <Text style={styles.value}>{'\u20B9'} 0</Text>
                                </View>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.label}>Outstanding Amount:</Text>
                                    <Text style={styles.value}>{'\u20B9'} 0</Text>
                                </View>
                            </View>
                        )}
                    </View>

                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Name</Text>
                        <Text style={styles.heading}>Amount</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => console.log("Navigate to Transport Record")}
                    >
                        <Text style={styles.addButtonText}>Add Transport</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
    tabs: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#6366f1',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        backgroundColor: '#f9f9f9',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6366f1',
        marginLeft: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#6366f1',
    },
    activeTabText: {
        color: '#6366f1',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 8,
        marginTop: 30,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    label: {
        fontSize: 16,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#6366f1',
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 14,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        marginBottom: 480
    },
    heading: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default DashboardScreen;
