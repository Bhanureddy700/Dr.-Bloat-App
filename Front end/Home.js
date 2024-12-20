import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const Home = ({ route }) => {
  const { userid } = route.params;
  const navigation = useNavigation();

  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    fetchTopUsers();
  }, []);

  const fetchTopUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search.php?userid=${userid}`);
      if (Array.isArray(response.data)) {
        setTopUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching top users:', error);
    }
  };

  const handleViewAll = () => {
    navigation.navigate('viewall', { userid });
  };

  const handleUserIdClick = (selectedUserId) => {
    // Handle navigation to other page with the selected user ID
    navigation.navigate('OtherPage', { userId: selectedUserId });
  };

  const handleDownloadClick = () => {
    // Navigate to the download screen
    navigation.navigate('DownloadScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/download.jpg')} style={styles.image} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {topUsers.map((user, index) => (
          <TouchableOpacity key={index} onPress={() => handleUserIdClick(user.userid)}>
            <View style={styles.userIdContainer}>
              {user.image ? (
                <Image source={{ uri: user.image }} style={styles.userImage} />
              ) : (
                <Ionicons name="person" size={width * 0.15} color="#0F5C69" style={styles.profileIcon} />
              )}
              <Text style={styles.userId}>{user.userid}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAll}>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userid })}>
          <Ionicons name="person" size={width * 0.09} color="#0F5C69" />
        </TouchableOpacity>
        {/* Download icon */}
        <TouchableOpacity onPress={handleDownloadClick}>
          <Ionicons name="download" size={width * 0.09} color="#0F5C69" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen',{userid : 'initialDoctorId'})}>
          <MaterialCommunityIcons name="account-plus" size={width * 0.1} color="#0F5C69" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NewRecordScreen')}>
          <Ionicons name="flask" size={width * 0.09} color="#0F5C69" />
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
    paddingBottom: height * 0.03,
  },
  image: {
    marginTop: height * 0.03,
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: width * 0.05,
    marginBottom: height * 0.2,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: height * 0.02,
  },
  scrollView: {
    height: height * 0.35,
    width: width * 0.9,
    borderRadius: width * 0.05,
    top: -height * 0.1,
    backgroundColor: "#BDCFCE",
    borderWidth: 2,
    borderColor: '#BDCFCE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  scrollViewContent: {
    top: height * 0.01,
    alignItems: 'center',
  },
  userImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.1,
    marginRight: width * 0.1,
  },
  profileIcon: {
    marginRight: width * 0.03,
  },
  userIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: width * 0.02,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.01,
    width: width * 0.8,
    height: height * 0.1,
    backgroundColor: '#FFF',
  },
  userId: {
    fontSize: width * 0.06,
  },
  viewAllButton: {
    position: 'absolute',
    bottom: height * 0.17,
    right: width * 0.1,
    backgroundColor: '#0F5C69',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  viewAllText: {
    color: 'white',
    fontSize: width * 0.04,
  },
});

export default Home;
