import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import API_BASE_URL from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const MessageContainer = ({ route }) => {
  const { userid } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/get_messages.php?userid=${userid}`)
      .then(response => {
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setMessages([]);
        }
        setLoading(false);

        // Start fade-in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        Alert.alert('Error', 'Failed to fetch messages');
        setError(error);
        setLoading(false);
      });
  }, [userid, fadeAnim]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (messages.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No messages found for UserID: {userid}</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.title}>Patient ID: {message.userid}</Text>
            <Text style={styles.messageText}>{message.message}</Text>
            <Text style={styles.dateTimeText}>{message.dateTime}</Text>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05, // 5% of screen width
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: height * 0.03, // 3% of screen height
  },
  messageContainer: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.2, // 20% of screen height
    backgroundColor: '#ccc',
    borderRadius: width * 0.03, // 3% of screen width
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03, // 3% of screen height
    padding: width * 0.03, // 3% of screen width
  },
  title: {
    fontSize: width * 0.06, // 6% of screen width
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: width * 0.05, // 5% of screen width
    marginTop: height * 0.01, // 1% of screen height
  },
  dateTimeText: {
    fontSize: width * 0.045, // 4.5% of screen width
    marginTop: height * 0.01, // 1% of screen height
  },
});

export default MessageContainer;
