import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import API_BASE_URL from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const NewRecordScreen = () => {
  const navigation = useNavigation();

  const [userid, setPatientId] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEnter = async () => {
    setLoading(true);
    try {
      // Make an API call to fetch user details using patientId
      const response = await fetch(`${API_BASE_URL}/record.php?userId=${userid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error(error);
      // Handle error gracefully, show error message to the user, etc.
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Patient ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Patient ID"
        onChangeText={text => setPatientId(text)}
        value={userid}
      />
      <Button title="Enter" onPress={handleEnter} disabled={loading} />
      {loading && <Text>Loading...</Text>}
      {userDetails && (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userDetailsTitle}>User Details:</Text>
          <View style={styles.userDetailsItem}>
            <Text style={styles.label}>User Id           :</Text>
            <Text style={styles.detailText}>{userDetails.userid}</Text>
          </View>
          <View style={styles.userDetailsItem}>
            <Text style={styles.label}>Name             :</Text>
            <Text style={styles.detailText}>{userDetails.name}</Text>
          </View>
          <View style={styles.userDetailsItem}>
            <Text style={styles.label}>Age                 :</Text>
            <Text style={styles.detailText}>{userDetails.age}</Text>
          </View>
          <View style={styles.userDetailsItem}>
            <Text style={styles.label}>Gender           :</Text>
            <Text style={styles.detailText}>{userDetails.gender}</Text>
          </View>
          <View style={styles.userDetailsItem}>
            <Text style={styles.label}>Address          :</Text>
            <Text style={styles.detailText}>{userDetails.address}</Text>
          </View>
          {/* Add more user details as needed */}
          <Button title="Next" onPress={() => navigation.navigate('SectionA', {userid})} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgb(232,232,232)', // Change container background color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Change text color
  },
  input: {
    height: 40,
    width: width * 0.9, // 90% of the screen width
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  userDetailsContainer: {
    width: width * 0.9, // 90% of the screen width
    marginTop: 20,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#008B8B', // Change container background color
  },
  userDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // Change text color
  },
  userDetailsItem: {
    width: width * 0.85, // 85% of the screen width
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 30,
    marginBottom: 8,
    color: '#fff', // Change label color
  },
  detailText: {
    width: width * 0.55, // 55% of the screen width
    color: '#fff', // Change text color
  },
});

export default NewRecordScreen;
