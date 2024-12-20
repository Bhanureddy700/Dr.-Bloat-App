import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Final = ({ route }) => {
  const { userid, message, dateTime } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setModalVisible(true);
    // Insert data into database
    sendDataToServer();
  }, []);

  const sendDataToServer = () => {
    axios.post(
      `${API_BASE_URL}/insert_message.php`,
      {
        userid: userid,
        message: message,
        dateTime: dateTime
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data, headers) {
          return Object.keys(data).map(key =>
            encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
          ).join('&');
        }]
      }
    )
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  const handleOkPress = () => {
    setModalVisible(false);
    navigation.navigate('NewRecordScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/tic.jpg')} // Replace with the actual path
          style={styles.image}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Message sent successfully</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleOkPress}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.04, // 5% of screen width
  },
  imageContainer: {
    width: width * 0.8, // 80% of screen width
    aspectRatio: 1, // Maintain a 1:1 aspect ratio
    marginBottom: height * 0.2, // 20% of screen height
    borderRadius: width * 0.05, // 5% of screen width
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContainer: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: width * 0.03, // 5% of screen width
    borderRadius: width * 0.05, // 5% of screen width
    alignItems: 'center',
    height:height*0.1,
    width: width * 0.6, // 90% of screen width
  },
  modalText: {
    fontSize: width * 0.04, // 5% of screen width
    marginBottom: height * 0.01, // 2% of screen height
  },
  okButton: {
    width: width * 0.3,
    marginTop: height * 0.0, // 2% of screen height
    backgroundColor: 'blue',
    borderRadius: width * 0.03, // 3% of screen width
    paddingVertical: height * 0.01, // 1.5% of screen height
    paddingHorizontal: width * 0.1, // 10% of screen width
  },
  okButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04, // 5% of screen width
  },
});

export default Final;
