import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Linking } from 'react-native';
import API_BASE_URL from './config';  // Import your API base URL from config

const { width, height } = Dimensions.get('window');

const DownloadScreen = ({ navigation }) => {

  const handleDownloadPatientData = async () => {
    const downloadUrl = `${API_BASE_URL}/download_patient_data.php`;

    try {
      // Open the download URL directly in the browser, which will trigger the download
      await Linking.openURL(downloadUrl);
      console.log("Patient data download started...");
    } catch (error) {
      console.error("Failed to download patient data", error);
    }
  };

  const handleDownloadSectionAData = async () => {
    const downloadUrl = `${API_BASE_URL}/download_section_a_data.php`;

    try {
      // Open the download URL for Section A data
      await Linking.openURL(downloadUrl);
      console.log("Section A data download started...");
    } catch (error) {
      console.error("Failed to download Section A data", error);
    }
  };

  const handleDownloadSectionBData = async () => {
    const downloadUrl = `${API_BASE_URL}/download_section_b_data.php`;

    try {
      // Open the download URL for Section B data
      await Linking.openURL(downloadUrl);
      console.log("Section B data download started...");
    } catch (error) {
      console.error("Failed to download Section B data", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Download Data</Text>

      <TouchableOpacity style={styles.button} onPress={handleDownloadPatientData}>
        <Text style={styles.buttonText}>Download Patient Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDownloadSectionAData}>
        <Text style={styles.buttonText}>Download Section A Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDownloadSectionBData}>
        <Text style={styles.buttonText}>Download Section B Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(232, 232, 232)',
    paddingBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.08,
    marginBottom: height * 0.05,
    color: '#0F5C69',
  },
  button: {
    backgroundColor: '#0F5C69',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: width * 0.05,
    marginVertical: height * 0.015,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.05,
  },
});

export default DownloadScreen;
