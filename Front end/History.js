import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const History = ({ route, navigation }) => {
  const { userId } = route.params;
  const [dates, setDates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/getdates.php?userId=${userId}`)
      .then(response => response.json())
      .then(data => setDates(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDatePress = (date) => {
    navigation.navigate('Response', { userId: userId, date: date });
  };

  const filteredDates = dates.filter(date => date.includes(searchQuery));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Date..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Text style={styles.title}>Patient ID: {userId}</Text>
      {filteredDates.map(date => (
        <TouchableOpacity key={date} style={styles.dateContainer} onPress={() => handleDatePress(date)}>
          <Text>Test taken at :</Text>
          <Text style={styles.dateText}>{date}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.01, // Adjust top padding based on screen height
    backgroundColor: 'rgb(232, 232, 232)',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.05, // Font size as 5% of screen width
    fontWeight: 'bold',
    marginBottom: height * 0.02, // Bottom margin as 2% of screen height
  },
  dateContainer: {
    backgroundColor: 'white',
    padding: height * 0.02, // Padding as 2% of screen height
    width: width * 0.75, // Width as 75% of screen width
    height: height * 0.09, // Height as 9% of screen height
    marginVertical: height * 0.01, // Vertical margin as 1% of screen height
    borderRadius: width * 0.03, // Border radius as 3% of screen width
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    marginTop: height * 0.01, // Top margin as 1% of screen height
    fontSize: width * 0.05, // Font size as 5% of screen width
  },
  searchInput: {
    width: '90%',
    height: height * 0.06, // Height as 6% of screen height
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.05, // Border radius as 5% of screen width
    paddingHorizontal: width * 0.03, // Horizontal padding as 3% of screen width
    marginBottom: height * 0.02, // Bottom margin as 2% of screen height
    marginTop: height * 0.03, // Top margin as 3% of screen height
  },
});

export default History;
