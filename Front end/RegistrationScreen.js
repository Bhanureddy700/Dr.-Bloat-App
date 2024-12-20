import { useNavigation, useRoute } from '@react-navigation/native';
import queryString from 'query-string'; // Import query-string for URL encoding
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userid: initialDoctorId } = route.params || {}; // Renamed doctorid to initialDoctorId

  const [userid, setUserid] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [doctorId, setDoctorId] = useState(''); // State for doctorId

  const handleRegistration = async () => {
    if (!userid || !name || !password || !confirmPassword || !mobile || !age || !gender || !address || !doctorId) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/signupconn.php?userid=${encodeURIComponent(userid)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = await response.json();
      
      if (data.exists) {
        alert("User ID already exists.");
        return;
      }
  
      const userData = {
        userid,
        name,
        password,
        mobile,
        age,
        gender,
        address,
        doctorId
      };

      const encodedData = queryString.stringify(userData);

      const registrationResponse = await fetch(`${API_BASE_URL}/signupconn.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedData,
      });
      
      const registrationData = await registrationResponse.text();
      console.log(registrationData);
      alert("Registration successful!");
      
      setUserid('');
      setName('');
      setPassword('');
      setConfirmPassword('');
      setMobile('');
      setAge('');
      setGender('');
      setAddress('');
      setDoctorId('');
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/signup.jpg')} style={styles.profileImage} />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="User ID"
          onChangeText={setUserid}
          value={userid}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          onChangeText={setMobile}
          value={mobile}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={setAge}
          value={age}
        />
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Gender:</Text>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
            onPress={() => setGender('male')}
          >
            <Text style={styles.genderButtonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
            onPress={() => setGender('female')}
          >
            <Text style={styles.genderButtonText}>Female</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={setAddress}
          value={address}
        />
        <TextInput
          style={styles.input}
          placeholder="Doctor ID"
          onChangeText={setDoctorId}
          value={doctorId} // Ensure this value is controlled by state
        />
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(124, 160, 185, 0.5)',
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
  },
  formContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: width * 0.05,
    borderRadius: width * 0.05,
    marginBottom: height * 0.02,
    width: width * 0.8,
    marginBottom: height * 0.15,
  },
  input: {
    height: height * 0.06,
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    backgroundColor: '#0F5C69',
    padding: height * 0.015,
    marginTop: height * 0.02,
    borderRadius: width * 0.05,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
    alignItems: 'center',
  },
  label: {
    marginRight: width * 0.02,
    fontSize: width * 0.045,
  },
  genderButton: {
    backgroundColor: '#86AAB9',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
  },
  genderButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  selectedGender: {
    backgroundColor: '#0F5C69',
  },
});

export default RegistrationScreen;
