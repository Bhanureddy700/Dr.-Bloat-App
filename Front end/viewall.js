import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window'); // Get the device's width and height

const Viewall = ({ route }) => {
  const { userid } = route.params;
  const navigation = useNavigation();

  const [topUsers, setTopUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTopUsers();
  }, []);

  const fetchTopUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/view.php?userid=${userid}`);
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

  const filteredUsers = topUsers.filter(user => user.userid.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Patient ID..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {filteredUsers.map((user, index) => (
          <TouchableOpacity key={index} onPress={() => handleUserIdClick(user.userid)}>
            <View style={styles.userIdContainer}>
              {user.image ? (
                <Image source={{ uri: user.image }} style={styles.userImage} />
              ) : (
                <Ionicons name="person" size={65} color="#0F5C69" style={styles.profileIcon} />
              )}
              <Text style={styles.userId}>{user.userid}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userid })}>
          <Ionicons name="person" size={30} color="#0F5C69" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
          <MaterialCommunityIcons name="account-plus" size={40} color="#0F5C69" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NewRecordScreen')}>
          <Ionicons name="flask" size={30} color="#0F5C69" />
        </TouchableOpacity>
      </View>
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
    width: width * 0.9, // 90% of the screen width
    height: 40,
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
    width: width * 0.8, // 80% of the screen width
    height: height * 0.1, // 10% of the screen height
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  userId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
    marginLeft: 15,
  },
  profileIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  scrollView: {
    height: height * 0.5, // 50% of the screen height
    width: width * 0.9, // 90% of the screen width
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
    marginBottom: 50
  },
  scrollViewContent: {
    width: '100%',
    marginLeft: 2,
    alignItems: 'center',
  },
});

export default Viewall;
