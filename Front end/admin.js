import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const AdminScreen = () => {
  const navigation = useNavigation();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = () => {
    if (adminId === 'simats' && password === 'simats@123') {
      navigation.navigate('admindashboard');
    } else {
      Alert.alert('Login Failed', 'Invalid admin ID or password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.adminPanel}>
        <Text style={styles.welcomeText}>Admin Login</Text>
        <View style={styles.additionalBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter Admin ID"
            value={adminId}
            onChangeText={(text) => setAdminId(text)}
          />
        </View>
        <View style={[styles.additionalBox, styles.passwordBox]}>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleAdminLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(232, 232, 232)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    position: 'absolute',
    top: height * 0.09,
    left: width * 0.06,
  },
  adminPanel: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.75)', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  additionalBox: {
    width: '100%',
    height: height * 0.07,
    borderRadius: 8,
    backgroundColor: '#7D95D461',
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  passwordBox: {
    marginBottom: 30,
  },
  input: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    width: '100%',
  },
  loginButton: {
    width: '90%',
    height: height * 0.07,
    backgroundColor: '#2DC2D7',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AdminScreen;
