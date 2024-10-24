// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Alert, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import { useSaleContext } from './SaleContext';
// import COLORS from '../conts/colors';

// const PurchaseForm = ({ navigation }) => {
//     // const { addSale } = useSaleContext();
//     // const [product, setProduct] = useState('');
//     // const [amount, setAmount] = useState('');
//     // const [quantity, setQuantity] = useState('');
//     // const [dueamount, setDueAmount] = useState('');
//     // const [paidamount, setPaidAmount] = useState('');

//     const [inputs, setInputs] = useState({
//         quantity: '',
//         price: '',
//         advamount: '',
//         totalAmount: '',
//         extrafield1: '',
//     })


//     useEffect(() => {
//         setInputs({
//             quantity: '',
//             price: '',
//             advamount: '',
//             totalAmount: '',
//             extrafield1: '',
//         });
//     }, []);


//     const handleSubmit = async () => {

//         console.log(inputs.quantity, inputs.price, inputs.advamount, inputs.totalAmount, inputs.extrafield1);

//         if (
//             inputs.quantity.trim() === '' ||
//             inputs.price.trim() === '' ||
//             inputs.advamount.trim() === '' ||
//             inputs.totalAmount.trim() === '' ||
//             inputs.extrafield1.trim() === ''
//         ) {

//             Alert.alert('Error', 'Please fill in all fields');

//         } else {

//             const myHeaders = new Headers();

//             myHeaders.append('Content-Type', 'application/json');

//             const requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: JSON.stringify({
//                     quantity: inputs.quantity,
//                     price: inputs.price,
//                     advamount: inputs.advamount,
//                     totalamount: inputs.totalAmount,
//                     extrafield1: inputs.extrafield1,
//                 }),
//                 redirect: 'follow',
//             };

//             try {
//                 const response = await fetch(
//                     'http://192.168.0.101:8081/TestMaven/chicken/formchick',
//                     requestOptions
//                 );

//                 if (!response.ok) {
//                     throw new Error(`Server returned ${response.status}: ${response.statusText}`);
//                 }

//                 const data = await response.json();
//                 console.log(data);

//                 if (data.status == 200) {
//                     Alert.alert('Sale added');
//                     setInputs({
//                         quantity: '',
//                         price: '',
//                         advamount: '',
//                         totalAmount: '',
//                         extrafield1: '',
//                     });
//                 } else {
//                     Alert.alert('Try Again');
//                 }
//             } catch (error) {
//                 console.error('Error:', error.message);
//                 Alert.alert('Network Error', 'Failed to connect to the server. Please try again.');
//             }
//         }
//     };


//     // const productOptions = [
//     //     { label: 'Chicks', value: 'Chicks' },
//     //     { label: 'Broilers', value: 'Broilers' },
//     //     { label: 'Eggs', value: 'Eggs' },
//     // ];

//     const handleInputChange = (text, input) => {
//         setInputs(prevState => ({ ...prevState, [input]: text }));
//     };

//     return (
//         <ImageBackground
//             source={require('../../assets/background_smartcheck.jpg')}
//             style={styles.container}
//             resizeMode="cover"
//         >
//             <View style={styles.overlay}>
//                 <View style={styles.card}>
//                     <Text style={styles.title}>Add Sale Record</Text>

//                     {/* <Text>Product:</Text>
//                 <RNPickerSelect
//                     items={productOptions}
//                     value={product}
//                     onValueChange={(value) => setProduct(value)}
//                     style={pickerSelectStyles}
//                 /> */}


//                     <Text>Quantity:</Text>
//                     <TextInput
//                         //value={amount}
//                         onChangeText={(text) => handleInputChange(text, 'quantity')}
//                         placeholder="Enter amount"
//                         keyboardType="numeric"
//                         style={styles.input}
//                     />


//                     <Text>Amount:</Text>
//                     <TextInput
//                         //value={amount}
//                         onChangeText={(text) => handleInputChange(text, 'price')}
//                         placeholder="Enter amount"
//                         keyboardType="numeric"
//                         style={styles.input}
//                     />

//                     <Text> Paid Amount:</Text>
//                     <TextInput
//                         //value={amount}
//                         onChangeText={(text) => handleInputChange(text, 'totalAmount')}
//                         placeholder="Enter amount"
//                         keyboardType="numeric"
//                         style={styles.input}
//                     />

//                     <Text>Advance Amount:</Text>
//                     <TextInput
//                         //value={amount}
//                         onChangeText={(text) => handleInputChange(text, 'advamount')}
//                         placeholder="Enter amount"
//                         keyboardType="numeric"
//                         style={styles.input}
//                     />

//                     <Text>Due Amount:</Text>
//                     <TextInput
//                         //value={amount}
//                         onChangeText={(text) => handleInputChange(text, 'extrafield1')}
//                         placeholder="Enter amount"
//                         keyboardType="numeric"
//                         style={styles.input}
//                     />

//                     <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                         <Text style={styles.buttonText}>Add Sale</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the opacity as needed
//         justifyContent: 'center',
//         padding: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         padding: 16,
//         borderRadius: 8,
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         margin: 20,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         padding: 8,
//     },
//     button: {
//         backgroundColor: COLORS.orange,
//         padding: 10,
//         borderRadius: 4,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         color: 'black',
//         paddingRight: 30,
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         borderWidth: 0.5,
//         borderColor: 'gray',
//         borderRadius: 8,
//         color: 'black',
//         paddingRight: 30,
//     },
// });

// export default PurchaseForm;


import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Modal, FlatList, Linking, TouchableWithoutFeedback } from 'react-native';
import COLORS from '../conts/colors';
import Contacts from 'react-native-contacts';

const PurchaseForm = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        buyer: '',
        purchase: '',
        price: '',
        totalAmount: '',
    });

    useEffect(() => {
        setInputs({
            buyer: '',
            purchase: '',
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
        setInputs({ ...inputs, buyer: contact.displayName });
        setIsModalVisible(false);
    };

    const handleInputChange = (text, input) => {
        if (input === 'purchase' || input === 'price') {
            const purchase = input === 'purchase' ? parseFloat(text) : parseFloat(inputs.purchase);
            const price = input === 'price' ? parseFloat(text) : parseFloat(inputs.price);
            const totalAmount = Number(purchase) * Number(price);
            console.log(totalAmount);
            setInputs(prevState => ({ ...prevState, [input]: text, totalAmount: '' + totalAmount }));
        } else {
            setInputs(prevState => ({ ...prevState, [input]: text }));
        }
    };

    const handleSubmit = async () => {
        if (Object.values(inputs).some(value => value.trim() === '')) {
            Alert.alert('Error', 'Please fill in all fields');
        } else {
            const { purchase, price } = inputs;

            const amount = parseFloat(purchase) * parseFloat(price);

            setInputs(prevState => ({ ...prevState, totalAmount: amount.toFixed(0) }));

            const myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    price: inputs.price,
                    extrafield1: "0",
                    totalamount: inputs.totalAmount,
                    advamount: "0",
                    buyername: inputs.buyer,
                    quantity: inputs.purchase,
                }),
                redirect: 'follow',
            };

            console.log(requestOptions);

            try {
                const response = await fetch('http://192.168.0.101:8081/TestMaven/chicken/formchick', requestOptions);

                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                console.log(data);

                if (data.status == 200) {
                    Alert.alert('Purchase added successfully');
                    setInputs({
                        buyer: '',
                        purchase: '',
                        price: '',
                        totalAmount: '',
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
                    <Text>{inputs.buyer || 'Name Of the Buyer/Customer'}</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    value={inputs.purchase}
                    onChangeText={(text) => handleInputChange(text, 'purchase')}
                    placeholder="Chicks Purchase(in Kg)"
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
                            <Text style={styles.modalHeader}>Select Buyer</Text>
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

export default PurchaseForm;
