import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

const ViewDoctorScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newDoctor, setNewDoctor] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/retrieve_doctors.php`);
      if (Array.isArray(response.data)) {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleAddDoctor = async () => {
    if (newDoctor.trim()) {
        try {
            const formData = new FormData();
            formData.append('doctorName', newDoctor); // Append form data for POST

            const response = await axios.post(`${API_BASE_URL}/add_doctor.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set header for FormData
                },
            });

            console.log("Response:", response.data); // Log the response for debugging

            if (response.data.success) {
                Alert.alert('Success', 'Doctor added successfully');
                setNewDoctor('');
                fetchDoctors(); // Refresh the list
            } else {
                Alert.alert('Error', `Failed to add doctor: ${response.data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error adding doctor:', error);
            Alert.alert('Error', 'Failed to add doctor');
        }
    } else {
        Alert.alert('Error', 'Please enter a doctor name');
    }
};



  const filteredDoctors = doctors.filter((doctor) =>
    doctor.DTID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchBar, { width: width * 0.8, height: height * 0.05 }]}
        placeholder="Search doctors..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <ScrollView style={[styles.scrollView, { width: width * 0.8 }]} contentContainerStyle={styles.scrollViewContent}>
        {filteredDoctors.map((doctor, index) => (
          <View key={index} style={[styles.doctorContainer, { width: width * 0.8, padding: height * 0.02 }]}>
            <Text style={styles.doctorId}>{doctor.DTID}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.addDoctorContainer, { width: width * 0.8 }]}>
        <TextInput
          style={[styles.addDoctorInput, { height: height * 0.06, width: width * 0.55 }]}
          placeholder="Add Doctor ID"
          value={newDoctor}
          onChangeText={(text) => setNewDoctor(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddDoctor}>
          <Ionicons name="add-circle" size={height * 0.08} color="#0F5C69" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(232, 232, 232)',
  },
  searchBar: {
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  doctorContainer: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  doctorId: {
    fontSize: 18,
  },
  addDoctorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  addDoctorInput: {
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ViewDoctorScreen;