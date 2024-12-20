import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const MyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/admin.png')} style={styles.image} />
        </View>
        <TouchableOpacity
          style={styles.textButton}
          onPress={() => navigation.navigate('admin')}>
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/doctor.png')} style={styles.image} />
        </View>
        <TouchableOpacity
          style={styles.textButton}
          onPress={() => navigation.navigate('DoctorScreen')}>
          <Text style={styles.buttonText}>Doctor</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/patient.png')} style={styles.image} />
        </View>
        <TouchableOpacity
          style={styles.textButton}
          onPress={() => navigation.navigate('PatientScreen')}>
          <Text style={styles.buttonText}>Patient</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(232, 232, 232)',
    paddingHorizontal: width * 0.05, // 5% of screen width for padding
  },
  contentContainer: {
    width: width * 0.9, // 90% of screen width
    alignItems: 'center',
    marginBottom: height * 0.03, // 3% of screen height for spacing
  },
  imageContainer: {
    width: width * 0.40, // 45% of screen width
    aspectRatio: 1, // Ensures the container is square
    borderRadius: width * 0.45 / 2, // Circular shape based on width
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: height * 0.015, // 1.5% of screen height for spacing
  },
  image: {
    width: '70%', // Image takes 70% of the container's width
    height: undefined,
    aspectRatio: 1, // Ensures the image is square
    borderRadius: 50, // Circular shape
    resizeMode: 'cover',
  },
  textButton: {
    width: width * 0.45, // 45% of screen width for button
    backgroundColor: '#0F5C69',
    paddingVertical: height * 0.015, // 1.5% of screen height for vertical padding
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05, // 5% of screen width for text size
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyScreen;
