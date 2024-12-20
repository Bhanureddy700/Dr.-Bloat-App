import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/get.jpg')} style={styles.image} />
      </View>
      <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('MyScreen')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
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
  welcomeContainer: {
    width: width * 0.8, // 80% of screen width
    alignItems: 'center',
    marginBottom: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  welcomeText: {
    fontSize: width * 0.1, // Font size based on screen width (10% of width)
    fontWeight: 'bold',
    color: 'black',
  },
  imageContainer: {
    width: width * 0.6, // 60% of screen width
    alignItems: 'center',
    marginBottom: 50,
  },
  image: {
    width: width * 0.6, // 60% of screen width
    height: width * 0.6, // Make it square (width = height)
    borderRadius: width * 0.3, // Make image round
    backgroundColor: '#ccc', // Placeholder background color
  },
  getStartedButton: {
    width: width * 0.7, // 70% of screen width
    marginTop: 10,
    backgroundColor: '#0F5C69',
    paddingVertical: height * 0.02, // 2% of screen height for padding
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFF',
    fontSize: width * 0.05, // Font size based on screen width (5%)
    fontWeight: 'bold',
    opacity: 0.7,
  },
});

export default GetStarted;
