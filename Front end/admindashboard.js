import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();

  const handleViewPatientScreen = () => {
    navigation.navigate('ViewDoctorScreen');
  };

  const handleViewDoctorScreen = () => {
    navigation.navigate('PatientDetails');
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.imageButton} onPress={handleViewPatientScreen}>
            <Image source={require('./assets/medical.jpg')} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.text}>View Doctor</Text>
        </View>
        <View style={styles.box}>
          <TouchableOpacity style={styles.imageButton} onPress={handleViewDoctorScreen}>
            <Image source={require('./assets/crowd.jpg')} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.text}>View Patient</Text>
        </View>
      </View>
    </View>
  );
};

// Get device dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfdff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: width * 0.8, // 70% of screen width
    height: height * 0.4, // 40% of screen height
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: height * 0.03, // 3% of screen height for spacing
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.47, // 45% of screen width
    height: height * 0.22, // 22% of screen height
    borderRadius: 25,
  },
  text: {
    fontSize: width * 0.05, // 5% of screen width for text size
    color: '#333',
    marginTop: height * 0.02, // 2% of screen height for spacing
    textAlign: 'center',
  },
  iconButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default AdminDashboardScreen;
