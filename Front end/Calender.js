import React from 'react';
import { View, StyleSheet ,Text} from 'react-native';

const Calender = ({ route }) => {
  const { userId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userId}!</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: 'rgb(232,232,232)', // Background color for the calendar container
  },
});

export default Calender;
