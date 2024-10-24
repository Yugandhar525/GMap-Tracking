import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Modal, Linking, TouchableWithoutFeedback } from 'react-native';
import COLORS from '../conts/colors';
import Contacts from 'react-native-contacts';

const TransportForm = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        customer: '',
        Diesel: '',
        price: '',
        totalAmount: '',
    });

    useEffect(() => {
        setInputs({
            customer: '',
            Diesel: '',
            price: '',
            totalAmount: '',
        });
    }, []);

    const [currentDate, setCurrentDate] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const openContactsApp = () => {
        Linking.openURL('content://com.android.contacts/contacts');
    };

    const handleContactSelection = (contact) => {
        if (!selectedContacts.includes(contact)) {
            setSelectedContacts(prevContacts => [...prevContacts, contact]);
            setInputs(prevState => ({ ...prevState, customer: contact }));
        }
    };

    const openContactPicker = () => {
        Contacts.getAll()
            .then(allContacts => {
                console.log(allContacts);
                setModalContacts(allContacts);
                setIsModalVisible(true);
            })
            .catch(error => console.log(error));
    };

    const handleInputChange = (text, input) => {
        if (input === 'sold' || input === 'price') {
            const sold = input === 'sold' ? parseFloat(text) : parseFloat(inputs.sold);
            const price = input === 'price' ? parseFloat(text) : parseFloat(inputs.price);
            const totalAmount = (sold * price).toFixed(1);
            setInputs(prevState => ({ ...prevState, [input]: text, totalAmount: totalAmount }));
        } else {
            setInputs(prevState => ({ ...prevState, [input]: text }));
        }
    };

    const getCurrentDate = () => {
        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setCurrentDate(formattedDate);
    };

    const handleSubmit = async () => {
        if (Object.values(inputs).some(value => value.trim() === '')) {
            Alert.alert('Error', 'Please fill in all fields');
        } else {
            const { sold, price } = inputs;
            const amount = parseFloat(sold) * parseFloat(price);
            setInputs(prevState => ({ ...prevState, totalAmount: amount.toFixed(2) }));
            Alert.alert('Transport added successfully');
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

                <View style={{ marginTop: 35 }}>
                    <TouchableOpacity style={styles.dateButton} onPress={getCurrentDate}>
                        <Text style={styles.dateButtonText}>{currentDate}</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={closeModal}
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
                            </TouchableOpacity>
                            {selectedContacts.map(contact => (
                                <TouchableOpacity key={contact} onPress={() => handleContactSelection(contact)}>
                                    <Text style={styles.contactItem}>{contact}</Text>
                                </TouchableOpacity>
                            ))}
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
    dateButton: {
        backgroundColor: COLORS.blue,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        width: 110,
        height: 50,
    },
    dateButtonText: {
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

export default TransportForm;
