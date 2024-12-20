import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const PatientHomeScreen = ({ route }) => {
  const { userid } = route.params;
  const navigation = useNavigation();

  const [patientDetails, setPatientDetails] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    fetchPatientDetails(userid);
    fetchUserImage(userid); // Call function to fetch user image
  }, []);

  const fetchPatientDetails = async (userid) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fetch_user_details.php?userId=${userid}`);
      const data = await response.json();
      
      if (data.details) {
        setPatientDetails(data.details);
      } else {
        console.error('Error fetching patient details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const fetchUserImage = async (userid) => {
    try {
      const response = await fetch(`${API_BASE_URL}/retrieve.php?userId=${userid}`);
      
      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        
        // Check if data.image is not an empty string
        if (data.image !== "") {
          setUserImage(data.image); // Set the user image state
        }
      } else {
        // Log error if response is not successful
        console.error('Failed to fetch user image. Status:', response.status);
      }
    } catch (error) {
      // Log any other errors that occur during the fetch
      console.error('Error fetching user image:', error);
    }
  };
  

  const handleBellIconPress = () => {
    navigation.navigate('MessageContainer', { userid });
  };

  const handleUploadImage = () => {
    navigation.navigate('ImageUpload', { userid });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.notificationIcon} onPress={handleBellIconPress}>
        <AntDesign name="bells" size={width * 0.08} color="#0F5C69" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.image} />
        ) : (
          <View style={styles.emptyImageContainer}>
            <AntDesign name="user" size={width * 0.25} marginBottom={height * 0.02} color="#0F5C69" />
          </View>
        )}
      </View>

      {patientDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Patient Details:</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Name          :      {patientDetails.name}</Text>
            <Text style={styles.detail}>PatientId     :      {patientDetails.userid}</Text>
            <Text style={styles.detail}>Gender        :      {patientDetails.gender}</Text>
            <Text style={styles.detail}>Address       :      {patientDetails.address}</Text>
            <Text style={styles.detail}>Mobile          :      {patientDetails.mobile}</Text>
            <Text style={styles.detail}>Age               :      {patientDetails.age}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleUploadImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: width * 0.05, // 5% of screen width
    borderRadius: width * 0.03, // 3% of screen width
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: height * 0.002, // 0.2% of screen height
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  notificationIcon: {
    position: 'absolute',
    top: height * 0.03, // 3% of screen height
    right: width * 0.05, // 5% of screen width
    padding: width * 0.03, // 3% of screen width
  },
  detailsContainer: {
    width: '100%',
  },
  title: {
    fontSize: width * 0.06, // 6% of screen width
    fontWeight: 'bold',
    marginBottom: height * 0.02, // 2% of screen height
  },
  detailContainer: {
    borderWidth: 1,
    borderColor: '#008B8B',
    borderRadius: width * 0.02, // 2% of screen width
    padding: width * 0.05, // 5% of screen width
    backgroundColor: "#BDCFCE",
    marginBottom: height * 0.04, // 4% of screen height
  },
  detail: {
    fontSize: width * 0.05, // 5% of screen width
    marginBottom: height * 0.02, // 2% of screen height
    color: "black"
  },
  imageContainer: {
    marginTop: height * 0.01, // 1% of screen height
  },
  image: {
    width: width * 0.4, // 40% of screen width
    height: width * 0.4, // Maintain square aspect ratio
    borderRadius: width * 0.2, // 20% of screen width for circular shape
    marginBottom: height * 0.03, // 3% of screen height
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: height * 0.002, // 0.2% of screen height
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyImageContainer: {
    marginTop: height * 0.02, // 2% of screen height
    marginBottom: height * 0.05, // 5% of screen height
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.25, // 25% of screen width
    height: width * 0.25, // Maintain square aspect ratio
    borderRadius: width * 0.125, // 12.5% of screen width for circular shape
    borderWidth: 1,
    borderColor: '#0F5C69',
  },
  button: {
    backgroundColor: '#0F5C69',
    paddingVertical: height * 0.015, // 1.5% of screen height
    paddingHorizontal: width * 0.1, // 10% of screen width
    marginTop: height * 0.02, // 2% of screen height
    borderRadius: width * 0.05, // 5% of screen width
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
});

export default PatientHomeScreen;
