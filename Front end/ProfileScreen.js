import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ route }) => {
  const { userid } = route.params;
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Add a flag to track whether the component is mounted

    // Fetch user details from the PHP endpoint with userId
    fetch(`${API_BASE_URL}/profile.php?userId=${userid}`)
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setUserDetails(data);
          setLoading(false);
        }
      })
      .catch(error => console.error('Error fetching user details:', error));

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [userid]);

  const handleLogout = () => {
    navigation.navigate('DoctorScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={width * 0.08} color="red" />
      </TouchableOpacity>

      {/* Display profile image */}
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        userDetails && (
          <Image source={{ uri: userDetails.image }} style={styles.profileImage} />
        )
      )}

      <View style={styles.profileBox}>
        <Text style={styles.title}>User Profile</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          userDetails && (
            <>
              <Text style={styles.detail}>UserID         :      {userid}</Text>
              <Text style={styles.detail}>Name          :      {userDetails.name}</Text>
              <Text style={styles.detail}>Mobile         :      {userDetails.mobile}</Text>
              <Text style={styles.detail}>Gender        :      {userDetails.gender}</Text>
            </>
          )
        )}
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
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    marginBottom: height * 0.05,
  },
  logoutButton: {
    position: 'absolute',
    top: height * 0.03,
    right: width * 0.05,
    zIndex: 1,
  },
  profileBox: {
    backgroundColor: '#BDCFCE',
    width: width * 0.8,
    padding: width * 0.05,
    borderWidth: 5,
    borderColor: '#BDCFCE',
    borderRadius: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: height * 0.02,
  },
  detail: {
    marginLeft: width * 0.02,
    width: width * 0.75,
    fontSize: width * 0.05,
    color: 'black',
    marginBottom: height * 0.015,
  },
});

export default ProfileScreen;
