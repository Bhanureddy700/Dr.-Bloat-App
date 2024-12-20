import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import API_BASE_URL from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Response = ({ route }) => {
  const { userId, date } = route.params;
  const [responses, setResponses] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [management, setManagement] = useState('');

  // Define an array of question contents
  const questionContents = [
    "Obstipation(Patient not passed stools or gas)",
    "Visible Intestinal Peristalsis(VIP)",
    "Vomiting",
    "Colicky Abdominal Pain",
    "Abdominal Distension",
    "Scar Over The Abdominal Wall",
    "Bowels Sounds"
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/getresponse.php?userId=${userId}&date=${date}`)
      .then(response => response.json())
      .then(data => {
        setResponses(data);
        calculateTotalScore(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const calculateTotalScore = (responses) => {
    let sum = responses.reduce((acc, curr) => acc + parseInt(curr.score), 0);
    setTotalScore(sum);
    if (sum <= 32) {
      setManagement('Conservative Management');
    } else {
      setManagement('Surgery');
    }
  };

  const renderContentForQuestion = (index, response) => {
    if (index === 0 && response.answer === 'Option 1') {
      return <Text>Present</Text>;
    } else if (index === 0 && response.answer === 'Option 2') {
      return <Text>Absent</Text>;
    }
    if (index === 1 && response.answer === 'Option 1') {
      return <Text>Present</Text>;
    } else if (index === 1 && response.answer === 'Option 2') {
      return <Text>Absent</Text>;
    }
    if (index === 2 && response.answer === 'Option 1') {
      return <Text>Bilious</Text>;
    } else if (index === 2 && response.answer === 'Option 2') {
      return <Text>Feculent</Text>;
    }
    if (index === 3 && response.answer === 'Option 1') {
      return <Text>1 to 3</Text>;
    } else if (index === 3 && response.answer === 'Option 2') {
      return <Text>4 to 6</Text>;
    }
    else if (index === 3 && response.answer === 'Option 3') {
      return <Text>7 to 10</Text>;
    }
    if (index === 4 && response.answer === 'Option 1') {
      return <Text>Present</Text>;
    } else if (index === 4 && response.answer === 'Option 2') {
      return <Text>Absent</Text>;
    }
    if (index === 5 && response.answer === 'Option 1') {
      return <Text>Present</Text>;
    } else if (index === 5 && response.answer === 'Option 2') {
      return <Text>Absent</Text>;
    }
    if (index === 6 && response.answer === 'Option 1') {
      return <Text>Increased</Text>;
    } else if (index === 6 && response.answer === 'Option 2') {
      return <Text>Decreased</Text>;
    }
    else if (index === 6 && response.answer === 'Option 3') {
      return <Text>Absent</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.managementContainer}>
        <Text style={[styles.managementText, { color: totalScore <= 32 ? 'green' : 'red' }]}>
          {management}
        </Text>
      </View>
      <Text style={styles.text}>User ID: {userId}</Text>
      <Text style={styles.text}>Date: {date}</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {responses.map((response, index) => (
          <View key={index} style={styles.responseContainer}>
            <Text style={styles.question}>Q{index + 1}: {questionContents[index]}</Text>
            <Text style={styles.answer}>Condition: {renderContentForQuestion(index, response)}</Text>
            <Text style={styles.question}>Score: {response.score}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(232, 232, 232)',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  scrollView: {
    height: height * 0.4, // 40% of the screen height
    width: width * 0.9,  // 90% of the screen width
    borderRadius: 20,
    backgroundColor: "#BDCFCE",
    borderWidth: 2,
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
    alignItems: 'center',
  },
  responseContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: width * 0.85,  // 85% of the screen width
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answer: {
    fontSize: 16,
  },
  managementContainer: {
    marginTop: 20,
  },
  managementText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Response;
