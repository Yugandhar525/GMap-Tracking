import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import "react-native-gesture-handler";
import { useShopContext } from './ShopContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../conts/colors';

const ShopFormData = ({ navigation, route }) => {

  const [inputs, setInputs] = useState({
    shopName: '',
    shopOwner: '',
    mobileNumber: '',
    Address: '',
  })


  useEffect(() => {
    setInputs({
      shopName: '',
      shopOwner: '',
      mobileNumber: '',
      Address: '',
    });
  }, []);

  const handleSubmit = async () => {
    if (inputs.shopName.trim() === '' || inputs.shopOwner.trim() === '' || inputs.mobileNumber.trim() === '' || inputs.Address.trim() === '') {
      Alert.alert('Error', 'Please fill in all required fields');
    } else {

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          shopname: inputs.shopName,
          shopowner: inputs.shopOwner,
          mobilenumber: inputs.mobileNumber,
          address: inputs.Address,
        }),
        redirect: 'follow',
      };

      try {
        const response = await fetch(
          'http://192.168.0.101:8081/TestMaven/chicken/savechick',
          requestOptions
        );

        const data = await response.json();

        if (data.status == 200) {
          //navigation.navigate('DisplayDetails');
          Alert.alert('shop added');
        } else {
          Alert.alert('Try Again');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };


  const handleInputChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  return (
    <ImageBackground
      source={require('../../assets/background_smartcheck.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Shop Information</Text>

          <TextInput
            style={styles.input}
            placeholder="Shop Name"
            //value={shopName}
            onChangeText={(text) => handleInputChange(text, 'shopName')}
          />

          <TextInput
            style={styles.input}
            placeholder="Shop Owner"
            //value={shopOwner}
            onChangeText={(text) => handleInputChange(text, 'shopOwner')}
          />

          <TextInput
            style={styles.input}
            placeholder="Mob no"
            //value={shopOwner}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange(text, 'mobileNumber')}
          />

          <TextInput
            style={styles.input}
            placeholder="Place"
            //value={shopOwner}
            onChangeText={(text) => handleInputChange(text, 'Address')}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the opacity as needed
    justifyContent: 'center',
    padding: 20,
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
    marginHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: COLORS.orange,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ShopFormData;
