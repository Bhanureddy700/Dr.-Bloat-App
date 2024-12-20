import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

const PatientDetails = ({ route }) => {
  const navigation = useNavigation();
  const [topUsers, setTopUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTopUsers();
  }, []);

  const fetchTopUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/view1.php`);
      if (Array.isArray(response.data)) {
        setTopUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching top users:', error);
    }
  };

  const handleUserIdClick = (selectedUserId) => {
    navigation.navigate('OtherPage', { userId: selectedUserId });
  };

  const filteredUsers = topUsers.filter(user =>
    user.userid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchInput, { width: width * 0.9, height: height * 0.05 }]}
        placeholder="Patient ID..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <ScrollView
        style={[styles.scrollView, { height: height * 0.4, width: width * 0.9 }]}
        contentContainerStyle={styles.scrollViewContent}
      >
        {filteredUsers.map((user, index) => (
          <TouchableOpacity key={index} onPress={() => handleUserIdClick(user.userid)}>
            <View style={[styles.userIdContainer, { width: width * 0.85, height: height * 0.11 }]}>
              {user.image ? (
                <Image source={{ uri: user.image }} style={[styles.userImage, { width: height * 0.09, height: height * 0.09 }]} />
              ) : (
                <Ionicons name="person" size={height * 0.09} color="#0F5C69" style={styles.profileIcon} />
              )}
              <Text style={styles.userId}>{user.userid}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgb(232, 232, 232)',
  },
  searchInput: {
    borderWidth: 2,
    borderColor: '#0F5C69',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  userIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  userId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userImage: {
    borderRadius: 35,
    marginRight: 10,
    marginLeft: 15,
  },
  profileIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  scrollView: {
    borderRadius: 20,
    backgroundColor: "#BDCFCE",
    borderWidth: 2,
    marginTop: 30,
    borderColor: '#BDCFCE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 50,
  },
  scrollViewContent: {
    width: '100%',
    marginLeft: 2,
    alignItems: 'center',
  },
});

export default PatientDetails;
