import React, { useState } from 'react';
import { View, Text, TextInput, Button, CheckBox, Alert } from 'react-native';

const SurveyScreen = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const aiModels = ['ChatGPT', 'Bard', 'Claude', 'Copilot'];

  const toggleModelSelection = (model) => {
    setSelectedModels(prev =>
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    );
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const handleSubmit = () => {
    if (!name || !birthDate || !city) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidDate(birthDate)) {
      Alert.alert('Invalid Birth Date', 'Birth date must be in YYYY-MM-DD format.');
      return;
    }

    if (selectedModels.length === 0) {
      Alert.alert('Model Selection Required', 'Please select at least one AI model.');
      return;
    }

    const surveyData = { name, birthDate, city, selectedModels };
    console.log('Survey Submitted:', surveyData);
    Alert.alert('Success', 'Survey submitted successfully!');
  };

  return (
    <View>
      <Text testID="Heading-Survey">Survey Artificial</Text>
      <TextInput
        testID="inputName-Survey"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        testID="inputBirthDate-Survey"
        placeholder="Birth Date (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <TextInput
        testID="inputCity-Survey"
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <Text>Select AI Models Used:</Text>
      {aiModels.map(model => (
        <View key={model}>
          <CheckBox
            testID={`checkbox-${model}`}
            value={selectedModels.includes(model)}
            onValueChange={() => toggleModelSelection(model)}
          />
          <Text testID={`label-${model}`}>{model}</Text>
        </View>
      ))}

      <Button
        testID="SubmitButton-Survey"
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default SurveyScreen;
