import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const PatientScreen = () => {
  const navigation = useNavigation();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!userid || !password) {
      showAlert('User ID and password are required.');
      return;
    }

    const loginApiUrl = `${API_BASE_URL}/signupconn.php`;

    const formData = new URLSearchParams();
    formData.append('userid', userid);
    formData.append('password', password);

    fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login Response:', data);
        if (data.status === 'success') {
          showAlert('Login successful!');
          navigation.navigate('PatientHomeScreen', { userid });
        } else {
          showAlert('Login failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Login Error:', error);
        showAlert('Login failed. Please try again.');
      });
  };

  const showAlert = message => {
    Alert.alert('Status', message);
  };

  return (
    <ImageBackground
      style={[styles.backgroundImage, { backgroundColor: 'rgb(232, 232, 232)' }]}
      resizeMode="cover"
    >
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Image source={require('./assets/LOGINPG.jpeg')} style={styles.profileImage} />
          <TextInput
            style={styles.input}
            placeholder="User ID"
            onChangeText={setUserid}
            value={userid}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01, // 1% of screen height
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: width * 0.05, // 5% of screen width
    marginTop: height * 0.03, // 3% of screen height
    borderRadius: width * 0.05, // 5% of screen width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    height: height * 0.05, // 5% of screen height
    width: width * 0.8, // 80% of screen width
    marginTop: height * 0.015, // 1.5% of screen height
    marginBottom: height * 0.02, // 2% of screen height
    borderRadius: width * 0.03, // 3% of screen width
    paddingLeft: width * 0.03, // 3% of screen width
    backgroundColor: '#BDCFCE',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 1.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  button: {
    marginLeft: width * 0.20, 
    width:width*0.4,
    backgroundColor: '#0F5C69',
    paddingVertical: height * 0.015, // 1.5% of screen height
    paddingHorizontal: width * 0.1, // 10% of screen width
    marginTop: height * 0.01, // 1% of screen height
    borderRadius: width * 0.05, // 5% of screen width
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  profileImage: {
    width: width * 0.5, // 50% of screen width
    height: width * 0.5, // Maintain square aspect ratio
    marginLeft: width * 0.15, // 10% of screen width for centering
    borderRadius: width * 0.05, // 5% of screen width
    marginBottom: height * 0.03, // 3% of screen height
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
});

export default PatientScreen;
