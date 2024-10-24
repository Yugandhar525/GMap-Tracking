import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Modal, FlatList, Linking, TouchableWithoutFeedback } from 'react-native';
import COLORS from '../conts/colors';
import Contacts from 'react-native-contacts';

const SaleForm = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        customer: '',
        sold: '',
        price: '',
        totalAmount: '',
    });

    useEffect(() => {
        setInputs({
            customer: '',
            sold: '',
            price: '',
            totalAmount: '',
        });
    }, []);

    const [currentDate, setCurrentDate] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [contacts, setContacts] = useState([]);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const openContactsApp = () => {
        Contacts.getAll()
            .then((contacts) => {
                console.log(contacts);
                setContacts(contacts);
                setIsModalVisible(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleContactSelection = (contact) => {
        setSelectedContacts([contact]);
        setInputs({ ...inputs, customer: contact.displayName });
        setIsModalVisible(false);
    };


    const handleInputChange = (text, input) => {
        if (input === 'sold' || input === 'price') {
            const sold = input === 'sold' ? parseFloat(text) : parseFloat(inputs.sold);
            const price = input === 'price' ? parseFloat(text) : parseFloat(inputs.price);
            const totalAmount = Number(sold) * Number(price);
            setInputs(prevState => ({ ...prevState, [input]: text, totalAmount: totalAmount }));
        } else {
            setInputs(prevState => ({ ...prevState, [input]: text }));
        }
    };

    const handleSubmit = async () => {

        if (Object.values(inputs).some(value => value.trim() === '')) {
            Alert.alert('Error', 'Please fill in all fields');
        } else {
            const { sold, price } = inputs;

            const amount = parseFloat(sold) * parseFloat(price);

            setInputs(prevState => ({ ...prevState, totalAmount: amount.toFixed(2) }));

            const myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    shopname: inputs.customer,
                    items: inputs.sold,
                    advamount: inputs.price,
                    totalamount: inputs.totalAmount,
                }),
                redirect: 'follow',
            };

            try {
                const response = await fetch('http://192.168.0.101:8081/TestMaven/chicken/savechick', requestOptions);

                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                console.log(data);

                if (data.status == 200) {
                    Alert.alert('Sale added successfully');
                    setInputs({
                        quantity: '',
                        price: '',
                        advamount: '',
                        totalAmount: '',
                        extrafield1: '',
                    });
                } else {
                    Alert.alert('Try Again');
                }
            } catch (error) {
                console.error('Error:', error.message);
                Alert.alert('Network Error', 'Failed to connect to the server. Please try again.');
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.inputTouchable} onPress={openModal}>
                    <Text>{inputs.customer || 'Name Of the seller/Customer'}</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    value={inputs.sold}
                    onChangeText={(text) => handleInputChange(text, 'sold')}
                    placeholder="Chicks Sold(in Kg)"
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    value={inputs.price}
                    onChangeText={(text) => handleInputChange(text, 'price')}
                    placeholder="Price/Kg"
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    value={inputs.totalAmount}
                    onChangeText={(text) => handleInputChange(text, 'totalAmount')}
                    placeholder="Amount"
                    keyboardType="numeric"
                />

                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>Select Customer</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addButton} onPress={openContactsApp}>
                                <Text style={styles.addButtonLabel}>Add New Member</Text>
                                <FlatList
                                    data={contacts}
                                    keyExtractor={(item) => item.recordID}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleContactSelection(item)} style={styles.contactItem}>
                                            <Text>{item.displayName}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputTouchable: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLORS.orange,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 20,
        textAlign: 'right',
    },
    contactItem: {
        fontSize: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addButton: {
        backgroundColor: COLORS.orange,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonLabel: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SaleForm;
