import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const MessageContainer = ({ userid, message, dateTime }) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient ID: {userid}</Text>
      <View style={styles.messageContainer}>
      <Text style={styles.title}>Patient ID: {userid}</Text>
      <Text style={styles.messageText}>Message: {message}</Text>
      <Text style={styles.dateTimeText}>Date and Time: {dateTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageContainer: {
    width: 300,
    height: 150,
    backgroundColor: '#ccc',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 18,
  },
});

export default MessageContainer;
