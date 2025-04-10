import React, { useState } from 'react';
import { View, Text, TextInput, Button, CheckBox, Alert } from 'react-native';

const SurveyScreen = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [gender, setGender] = useState('');
  const [aiModelType, setAiModelType] = useState('');
  const [prosCons, setProsCons] = useState('');
  const [beneficialUseCase, setBeneficialUseCase] = useState('');
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
    if (!name || !birthDate || !city || !educationLevel || !gender || !aiModelType || !prosCons || !beneficialUseCase) {
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

    const surveyData = {
      name,
      birthDate,
      city,
      educationLevel,
      gender,
      aiModelType,
      prosCons,
      beneficialUseCase,
      selectedModels
    };

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
      <TextInput
        testID="selectEducationLevel-Survey"
        placeholder="Education Level"
        value={educationLevel}
        onChangeText={setEducationLevel}
      />
      <TextInput
        testID="selectGender-Survey"
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        testID="selectAIModelType-Survey"
        placeholder="AI Model Type (e.g., NLP, CV)"
        value={aiModelType}
        onChangeText={setAiModelType}
      />
      <TextInput
        testID="inputProsCons-Survey"
        placeholder="Pros & Cons of AI Models"
        value={prosCons}
        onChangeText={setProsCons}
      />
      <TextInput
        testID="inputBeneficialUseCase-Survey"
        placeholder="Most Beneficial Use Case"
        value={beneficialUseCase}
        onChangeText={setBeneficialUseCase}
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
        testID="buttonSubmit-Survey"
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default SurveyScreen;
