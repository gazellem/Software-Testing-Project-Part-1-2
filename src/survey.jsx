import React, { useState } from 'react';
import { View, Text, TextInput, Button, CheckBox, Alert, StyleSheet } from 'react-native';

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

  const isValidName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name); // only letters and spaces allowed
  };

  const isValidCity = (city) => {
    return /^[a-zA-Z\s]+$/.test(city); // only letters and spaces allowed
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

    if (!isValidName(name)) {
      Alert.alert('Invalid Name', 'Name must only contain letters and spaces.');
      return;
    }

    if (!isValidCity(city)) {
      Alert.alert('Invalid City', 'City must only contain letters and spaces.');
      return;
    }

    if (prosCons.length < 10 || prosCons.length > 250) {
      Alert.alert('Invalid Pros and Cons', 'Pros and Cons must be between 10 and 250 characters.');
      return;
    }

    if (beneficialUseCase.length < 10 || beneficialUseCase.length > 250) {
      Alert.alert('Invalid Beneficial Use Case', 'Beneficial Use Case must be between 10 and 250 characters.');
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
    <View style={styles.container}>
      <Text testID="Heading-Survey">Survey Artificial</Text>

      <TextInput
        testID="inputName-Survey"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {name && !isValidName(name) && (
        <Text testID="errorNameInvalid" style={styles.error}>Name must only contain letters and spaces.</Text>
      )}

      <TextInput
        testID="inputBirthDate-Survey"
        placeholder="Birth Date (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      {!isValidDate(birthDate) && birthDate.length > 0 && (
        <Text testID="errorBirthDateInvalid" style={styles.error}>Invalid date format</Text>
      )}

      <TextInput
        testID="inputCity-Survey"
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      {city && !isValidCity(city) && (
        <Text testID="errorCityInvalid" style={styles.error}>City must only contain letters and spaces.</Text>
      )}

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
      {(prosCons.length < 10 || prosCons.length > 250) && (
        <Text testID="errorProsConsLength" style={styles.error}>Pros and Cons must be between 10 and 250 characters.</Text>
      )}

      <TextInput
        testID="inputBeneficialUseCase-Survey"
        placeholder="Most Beneficial Use Case"
        value={beneficialUseCase}
        onChangeText={setBeneficialUseCase}
      />
      {(beneficialUseCase.length < 10 || beneficialUseCase.length > 250) && (
        <Text testID="errorBeneficialUseCaseLength" style={styles.error}>Beneficial Use Case must be between 10 and 250 characters.</Text>
      )}

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

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8
  },
  error: {
    color: 'red',
    marginBottom: 10
  }
});

export default SurveyScreen;
