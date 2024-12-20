import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API_BASE_URL from './config';

const ImageUpload = ({ route }) => {
  const { userid } = route.params;
  const [image, setImage] = useState(null);
  const [shouldUpload, setShouldUpload] = useState(false); // Flag to control upload

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("You haven't picked an image yet.");
      } else if (response.errorCode) {
        Alert.alert('Image Picker Error:', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setImage(response.assets[0].uri);
        setShouldUpload(true); // Trigger upload
      }
    });
  };

  useEffect(() => {
    if (shouldUpload && image) {
      uploadImage();
      setShouldUpload(false); // Reset flag after uploading
    }
  }, [shouldUpload, image]); // Trigger when shouldUpload or image changes

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('userid', userid);
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch(`${API_BASE_URL}/patientimage.php`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.json();
      console.log("Upload Response:", responseData);

      if (responseData.success) {
        Alert.alert('Image uploaded successfully!');
      } else {
        Alert.alert('Failed to upload image: ' + responseData.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('An error occurred while uploading the image.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Ionicons name="image" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={() => setShouldUpload(true)}>
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDF5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2DC2D7',
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '700',
    color: '#000000',
  },
  uploadButton: {
    backgroundColor: '#0F5C69',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageUpload;
