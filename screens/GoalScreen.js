import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GoalScreen = ({navigation, route}) => {
  const [goals, setGoals] = useState([])
  const [formValues, setFormValues] = useState({
    themeWords: '',
    deadline: '',
    wordCount: ''
  });

  useEffect(() => {
    saveGoals();
  }, [goals]);

  const handleInputChange = (inputName, inputValue) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [inputName]: inputValue
    }));
  };

  const handleFormSubmit = async () => {
    const updatedGoals = [...goals, formValues];
    setGoals(updatedGoals);
  };

  const saveGoals = async () => {
    try {
      await AsyncStorage.setItem('goals', JSON.stringify(goals));
      alert('save data')
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <View>
      <Text>theme words:</Text>
      <TextInput value={formValues.themeWords} onChangeText={text => handleInputChange('themeWords', text)} />

      <Text>deadline:</Text>
      <TextInput value={formValues.deadline} onChangeText={text => handleInputChange('deadline', text)} />

      <Text>word count:</Text>
      <TextInput value={formValues.wordCount} onChangeText={text => handleInputChange('wordCount', text)} />

      <Button title="Save" onPress={handleFormSubmit} />
    </View>
    )
};

  export default GoalScreen