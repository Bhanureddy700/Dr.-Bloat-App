import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const DoctorRegistration = () => {
  const navigation = useNavigation();
  const [userid, setUserid] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);

  const handleRegistration = async () => {
    // Check if all fields are filled
    if (!userid || !name || !password || !confirmPassword || !mobile || !gender || !image) {
      Alert.alert("Please fill in all fields.");
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('userid', userid);
      formData.append('name', name);
      formData.append('password', password);
      formData.append('mobile', mobile);
      formData.append('gender', gender);
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
  
      const registrationResponse = await fetch(`${API_BASE_URL}/dtsignup.php`, {
        method: 'POST',
        body: formData,
      });
  
      const registrationData = await registrationResponse.json(); // Parse response as JSON
  
      if (registrationData.status === "success") {
        Alert.alert("Registration successful!");
        navigation.navigate('DoctorScreen');
  
        // Reset form fields and image
        setUserid('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setMobile('');
        setGender('');
        setImage(null);
      } else {
        Alert.alert(registrationData.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("An error occurred. Please try again later.");
    }
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("You haven't picked an image yet.");
      } else if (response.errorCode) {
        Alert.alert('Image Picker Error:', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Ionicons name="image" size={width * 0.3} color="#CCCCCC" />
        )}
      </TouchableOpacity>

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
    backgroundColor: 'rgb(232, 232, 232)',
  },
  imagePickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.37, // 35% of screen width
    height: width * 0.37, // 35% of screen width (to maintain a square)
    borderRadius: (width * 0.35) / 2, // 50% of width for a circle
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2DC2D7',
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadText: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: '700',
    color: '#000000',
  },
  formContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: width * 0.9, // 90% of screen width
  },
  input: {
    height: height * 0.06, // 6% of screen height
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#BDCFCE',
    width: width * 0.8, // 90% of screen width
  },
  button: {
    backgroundColor: '#0F5C69',
    padding: 12,
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: width * 0.8, // 90% of screen width
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    fontSize: width * 0.04, // 4% of screen width
  },
  genderButton: {
    backgroundColor: '#86AAB9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  genderButtonText: {
    color: '#fff',
  },
  selectedGender: {
    backgroundColor: '#0F5C69',
  },
});

export default DoctorRegistration;
