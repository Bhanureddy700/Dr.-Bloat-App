import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import API_BASE_URL from './config';

const SectionB = ({ navigation,route }) => {
  const { userid, sum } = route.params;
  const [answers, setAnswers] = useState({});
  const [dateTime, setDateTime] = useState(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

  const handleAnswer = (question, option, scoreMapping) => {
    const score = scoreMapping[option] || 0;
    setAnswers({ ...answers, [question]: score, [`${question}_selectedOption`]: option });
  };

  const goToFinal = () => {
    for (const key in answers) {
      if (!answers[key]) {
        Alert.alert('Please answer all questions before proceeding.');
        return;
      }
    }
  
    // Calculate sum of scores for questions 1 through 7
    const sum1 = Object.values(answers).reduce((total, currentValue) => {
      return total + (Number(currentValue) || 0); // Convert to number and handle NaN
    }, 0);
    console.log("Answers:", answers);
    const message = "please contact doctor";
    const dateTimeData = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Get current date and time
  
    // Navigate to Final screen and pass message, date-time data, userid, and sums to Final screen
    fetch(`${API_BASE_URL}/sectionb.php`, {
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
        dateTime: dateTime,
      }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        navigation.navigate('Display', {
          userid: userid,
          message: message,
          dateTime: dateTimeData,
          sum: sum,
          sum1: sum1
        });
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
            <Text style={styles.questionText}>Air Fluids                                           </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question1', value,{ 'Option 1': 8, 'Option 2': 1 } )}
              value={answers['question1_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>More than 5           </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Less than 5</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 2:</Text>
            <Text style={styles.questionText}>Dilated Bowel                                   </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question2', value,{ 'Option 1': 8, 'Option 2': 1 })}
              value={answers['question2_selectedOption']}
            >
                
                <Text style={styles.questionText}>   Small Bowel (2.5cm-7cm)</Text>
                <Text style={styles.questionText}>   Large Bowel (7cm-10cm)</Text>
              
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Present</Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Absent</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 3:</Text>

            <Text style={styles.questionText}>Transition Zone                                 </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question3', value,{ 'Option 1': 8, 'Option 2': 1 })}
              value={answers['question3_selectedOption']}
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
          <Text style={styles.questionText}>Question 4:</Text>
            <Text style={styles.questionText}>Decreased Wall Enhancement     </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question4', value,{ 'Option 1': 8, 'Option 2': 1 })}
              value={answers['question4_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Present               </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Absent</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question 5:</Text>

            <Text style={styles.questionText}>Intra Mural Air                                     </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question5', value,{ 'Option 1': 8, 'Option 2': 1 })}
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

            <Text style={styles.questionText}>Wall Thickness More Than 3mm                                  </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question6', value,{ 'Option 1': 5, 'Option 2': 2 })}
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

            <Text style={styles.questionText}>Peritoneal Free Fluid / Mesentric Fat Stranding                                     </Text>
            <RadioButton.Group
              onValueChange={value => handleAnswer('question7', value,{ 'Option 1': 5, 'Option 2': 2 })}
              value={answers['question7_selectedOption']}
            >
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 1" color="black" />
                <Text style={styles.optionText}>Present             </Text>
              </View>
              <View style={styles.optionsContainer}>
                <RadioButton value="Option 2" color="black" />
                <Text style={styles.optionText}>Absent</Text>
              </View>
            </RadioButton.Group>
          </View>


          

          {/* Add more question containers here */}
        </View>


        <TouchableOpacity style={styles.button} onPress={goToFinal}>
        <Text style={styles.buttonText}>    Submit</Text>
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
    height:1600,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    marginTop:30,
    borderRadius:20,
    marginBottom:50,

  },
  profileImg: {
    width: 200,
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
    color:"#fff",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:-5
  },
  optionsContainer: {
    color:"black",
    flexDirection: 'row',
    alignItems: 'center',
    width:290
    
  },
  optionText: {
    color:"#fff",
    fontSize: 16,
    marginLeft: 0,
    marginRight:130
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

export default SectionB;
