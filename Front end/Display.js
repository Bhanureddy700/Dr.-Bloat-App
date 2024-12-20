import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Display = ({ route }) => {
  const { userid, sum, sum1, message, dateTime } = route.params;
  const navigation = useNavigation();

  const manageType = sum < 32 && sum1 < 20 ? "Conservative Management" : "Surgery";

  const goToFinal = () => {
    navigation.navigate('Final', {
      userid: userid,
      sum: sum,
      sum1: sum1,
      message,
      dateTime
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>User ID     :    {userid}</Text>
        <Text style={styles.text}>Score in Section-A      :     {sum}</Text>
        <Text style={styles.text}>Score in Section-B      :     {sum1}</Text>
        <Text style={styles.text}>Management Type   :  {manageType}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={goToFinal}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  content: {
    backgroundColor: '#E5E5E5',
    padding: width * 0.05, // 5% of screen width
    borderRadius: width * 0.02, // 2% of screen width
    marginBottom: height * 0.03, // 3% of screen height
    alignItems: 'center',
    width: width * 0.9, // 90% of screen width
  },
  text: {
    fontSize: width * 0.05, // 5% of screen width
    marginBottom: height * 0.02, // 2% of screen height
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0F5C69',
    paddingVertical: height * 0.02, // 2% of screen height
    paddingHorizontal: width * 0.1, // 10% of screen width
    borderRadius: width * 0.05, // 5% of screen width
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: 'bold',
  },
});

export default Display;
