import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';
const { width, height } = Dimensions.get('window');

const OtherPage = ({ route }) => {
  const { userId } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);
  const navigation = useNavigation();
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    fetchPatientDetails(userId);
    fetchUserImage(userId);
  }, [userId]);

  const fetchPatientDetails = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/userdetails.php?userId=${userId}`);
      const data = await response.json();
      setPatientDetails(data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const fetchUserImage = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/retrieve.php?userId=${userId}`);
      
      // Read the response text first
      const textResponse = await response.text();
      console.log('Response Text:', textResponse);
      
      // Parse the response text as JSON
      const data = JSON.parse(textResponse);
      
      // Check if the response is OK
      if (response.ok) {
        if (data.image) {
          setUserImage(data.image);
        } else {
          console.warn('No image found in response');
        }
      } else {
        console.error('Failed to fetch user image. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user image:', error);
    }
  };
  
  const handleViewResult = () => {
    navigation.navigate('Score', { userId });
  };

  const handleOpenWhatsApp = () => {
    if (!patientDetails || !patientDetails.mobile) {
      console.warn('No contact number provided');
      return;
    }

    let phoneNumber = patientDetails.mobile;
    // Check if the phone number starts with a '+' (indicating it already includes the country code)
    if (!phoneNumber.startsWith('+')) {
      // Assume a default country code if none provided (e.g., +91 for India)
      phoneNumber = `+91${phoneNumber}`; // Replace with your default country code
    }

    const message = `Hello ${patientDetails.name}, I am your doctor. Are you experiencing any problems?`;
    Linking.openURL(`whatsapp://send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`);
  };

  if (userImage === null) {
    console.log("User image is null");
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.image} />
        ) : (
          <View style={styles.emptyImageContainer}>
            <Ionicons name="person" size={65} color="#0F5C69" style={styles.profileIcon} />
          </View>
        )}
      </View>
      {patientDetails ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Patient Details:</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>
              <Text style={styles.detailLabel}>Name:</Text> {patientDetails.name}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.detailLabel}>Mobile:</Text> {patientDetails.mobile}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.detailLabel}>PatientId:</Text> {patientDetails.userid}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.detailLabel}>Gender:</Text> {patientDetails.gender}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.detailLabel}>Address:</Text> {patientDetails.address}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.detailLabel}>Age:</Text> {patientDetails.age}
            </Text>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewScoreButton} onPress={handleViewResult}>
          <Text style={styles.viewScoreButtonText}>View Result</Text>
        </TouchableOpacity>
        {patientDetails && patientDetails.mobile && (
          <TouchableOpacity style={styles.whatsappButton} onPress={handleOpenWhatsApp}>
            <Ionicons name="logo-whatsapp" size={24} color="#fff" style={styles.whatsappIcon} />
            <Text style={styles.whatsappButtonText}>WhatsApp</Text>
          </TouchableOpacity>
        )}
      </View>
      {!patientDetails?.mobile && <Text style={styles.noContactText}>No contact number provided</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailContainer: {
    borderWidth: 1,
    borderColor: '#008B8B',
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#BDCFCE",
    marginBottom: 20,
  },
  detail: {
    fontSize: 20,
    marginBottom: 10,
    color: "black"
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  viewScoreButton: {
    backgroundColor: '#90EE90',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  viewScoreButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2DC2D7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  whatsappIcon: {
    marginRight: 8,
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noContactText: {
    fontSize: 18,
    color: '#FF6347',
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
  marginTop:5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyImageContainer: {
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#0F5C69',
  },
});

export default OtherPage;
