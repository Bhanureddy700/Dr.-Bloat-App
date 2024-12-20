import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import API_BASE_URL from './config';

const SectionA = ({ navigation, route }) => {
  const { userid } = route.params;
  const [answers, setAnswers] = useState({});
  const [dateTime, setDateTime] = useState(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

  const handleAnswer = (question, option, scoreMapping) => {
    const score = scoreMapping[option] || 0;
    setAnswers({ ...answers, [question]: score, [`${question}_selectedOption`]: option });
  };

  const goToSectionB = () => {
    // Calculate the sum of all seven integer answers
    const sum = Object.values(answers).reduce((total, currentValue) => {
      return total + (Number(currentValue) || 0); // Convert to number and handle NaN
    }, 0);
  
    for (const key in answers) {
      if (!answers[key]) {
        Alert.alert('Please answer all questions before proceeding.');
        return;
      }
    }
    console.log("Answers:", answers);
    fetch(`${API_BASE_URL}/sectiona.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userid,
        question1: answers['question1'],
        question2: answers['question2'],
        question3: answers['question3'],
        question4: answers['question4'],
        question5: answers['question5'],
        question6: answers['question6'],
        question7: answers['question7'],
        question1_selectedOption: answers['question1_selectedOption'],
        question2_selectedOption: answers['question2_selectedOption'],
        question3_selectedOption: answers['question3_selectedOption'],
        question4_selectedOption: answers['question4_selectedOption'],
        question5_selectedOption: answers['question5_selectedOption'],
        question6_selectedOption: answers['question6_selectedOption'],
        question7_selectedOption: answers['question7_selectedOption'],
        sum: sum, // Include the sum in the request
        dateTime: dateTime,
      }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        navigation.navigate('SectionB', { userid,sum });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 1:</Text>
            <Text style={styles.questionText}>Obstipation(Patien not passed stools or gas)            </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question1', value, { 'Option 1': 8, 'Option 2': 1 })}
              value={answers['question1_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Present                     </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Absent</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 2:</Text>
            <Text style={styles.questionText}> Visible Intestinal Peristalsis(VIP)</Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question2', value,{ 'Option 1': 8, 'Option 2': 1 })}
              value={answers['question2_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Present                     </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Absent</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 3:</Text>

            <Text style={styles.questionText}>Vomiting                                         </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question3', value,{ 'Option 1': 2, 'Option 2': 5 })}
              value={answers['question3_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Bilious                      </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Feculent</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 4:</Text>
            <Text style={styles.questionText}>Colicky Abdominal Pain                </Text>
            <Image source={require('./assets/pain3.png')} style={styles.profileImg} />
            <RadioButton.Group
              onValueChange={value => handleAnswer('question4', value,{ 'Option 1': 1, 'Option 2': 3, 'Option 3': 5 })}
              value={answers['question4_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>1 - 3                             </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>4 - 6</Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 3" color="black" />
                <Text style={styles.optionText}>7 - 10</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 5:</Text>

            <Text style={styles.questionText}> Abdominal Distension                                      </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question5', value,{ 'Option 1': 5, 'Option 2': 1 })}
              value={answers['question5_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Present                   </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Absent</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 6:</Text>

            <Text style={styles.questionText}> Scar Over The Abdominal Wall                                      </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question6', value,{ 'Option 1': 5, 'Option 2': 1 })}
              value={answers['question6_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Present                   </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Absent</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 7:</Text>

            <Text style={styles.questionText}> Bowels Sounds                                      </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question7', value,{ 'Option 1': 5, 'Option 2': 1 ,'Option 3': 2 })}
              value={answers['question7_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Increased             </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Decreased</Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 3" color="black" />
                <Text style={styles.optionText}>Absent</Text>
              </View>
            </RadioButton.Group>
          </View>


          

          {/* Add more question containers here */}
        </View>


        <TouchableOpacity style={styles.button} onPress={goToSectionB}>
        <Text style={styles.buttonText}>      Next</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#86AAB9',
  },
  scrollContainer: {
    width : 320,
    height:1730,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    marginTop:30,
    borderRadius:20,
    marginBottom:30,

  },
  profileImg: {
    width: 290,
    height: 120,
    marginTop: 5, 
    marginBottom:10
  },
  formContainer: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    width: '80%',
    
  },
  questionContainer: {
    backgroundColor: '#008B8B',
    borderRadius: 10,
    padding: 15,
    width : 300,
    marginLeft: -42,
    marginTop: 24,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#fff",
    marginLeft:-5
  },
  optionsContainer: {
    color:"black",
    flexDirection: 'row',
    alignItems: 'center',
    width:290
    
  },
  optionText: {
    fontSize: 16,
    marginLeft: 0,
    marginRight:100,
    color:"#fff"
  },
  button: {
    backgroundColor: '#0F5C69',
    padding: 12,
    borderRadius: 30,
    marginBottom:80
  },
  buttonText: {
    color: '#FFFFFF',
    width:100,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SectionA;