import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const Score = ({ route }) => {
    const { userId } = route.params;
    const navigation = useNavigation(); // Initialize navigation

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.textButton}
                    onPress={() => navigation.navigate('History', { userId })}>
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Section-A</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.textButton}
                    onPress={() => navigation.navigate('History1', { userId })}>
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Section-B</Text>
                </TouchableOpacity>
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
    contentContainer: {
        alignItems: 'center',
        marginBottom: height * 0.05, // Adjust margin based on screen height (5% of screen height)
    },
    textButton: {
        backgroundColor: '#0F5C69', // Button color
        paddingVertical: height * 0.015, // Responsive vertical padding (1.5% of screen height)
        width: width * 0.35, // Responsive width (35% of screen width)
        height: height * 0.07, // Responsive height (7% of screen height)
        paddingHorizontal: width * 0.05, // Responsive horizontal padding
        borderRadius: width * 0.05, // Responsive border radius (5% of screen width)
        marginBottom: height * 0.02, // Adjust spacing between buttons (2% of screen height)
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    buttonText: {
        fontSize: width * 0.05, // Responsive font size (5% of screen width)
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Score;
