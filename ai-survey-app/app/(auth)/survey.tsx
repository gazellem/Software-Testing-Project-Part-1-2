import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const aiModels = ['ChatGPT', 'Bard', 'Claude', 'Copilot'];

const SurveyScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [gender, setGender] = useState('');
  const [aiModelType, setAiModelType] = useState('');
  const [prosCons, setProsCons] = useState('');
  const [beneficialUseCase, setBeneficialUseCase] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    birthDate: false,
    city: false,
    prosCons: false,
    beneficialUseCase: false,
  });

  const toggleModelSelection = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

  const isValidDate = (dateString: string): boolean =>
    /^(\d{4}[\/.]\d{2}[\/.]\d{2})$/.test(dateString);

  const isValidAge = (birthDate: string): boolean => {
    const birth = new Date(birthDate.replace(/[\./]/g, '/')); // Normalize the date format
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    return age > 18 || (age === 18 && m >= 0);
  };

  const isValidName = (text: string): boolean => /^[a-zA-Z\s]+$/.test(text);
  const isValidCity = (text: string): boolean => /^[a-zA-Z\s]+$/.test(text);
  const isValidTextLength = (text: string): boolean =>
    text.length >= 10 && text.length <= 250;

  const isFormValid = (): boolean =>
    Boolean(name) &&
    isValidName(name) &&
    Boolean(birthDate) &&
    isValidDate(birthDate) &&
    isValidAge(birthDate) &&
    Boolean(city) &&
    isValidCity(city) &&
    Boolean(educationLevel) &&
    Boolean(gender) &&
    Boolean(aiModelType) &&
    isValidTextLength(prosCons) &&
    isValidTextLength(beneficialUseCase);

  const handleSubmit = (): void => {
    if (alreadySubmitted) return;

    if (!isFormValid()) {
      Alert.alert('Validation Error', 'Please correct the errors before submitting.');
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
      selectedModels,
    };

    console.log('Survey Submitted:', surveyData);
    setAlreadySubmitted(true);
    Alert.alert('Success', 'Survey submitted successfully!');
  };

  const CustomCheckbox = ({
    value,
    onValueChange,
    testID,
  }: {
    value: boolean;
    onValueChange: () => void;
    testID?: string;
  }) => (
    <TouchableOpacity
      testID={testID}
      onPress={onValueChange}
      style={[styles.checkbox, value && styles.checked]}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text testID="Heading-Survey" style={styles.heading}>
        AI Survey Form
      </Text>

      <TextInput
        testID="inputName-Survey"
        placeholder="Name"
        value={name}
        onChangeText={setName}
        onFocus={() => setTouchedFields((prev) => ({ ...prev, name: true }))}
        style={styles.input}
      />
      {touchedFields.name && name && !isValidName(name) && (
        <Text testID="errorNameInvalid" style={styles.error}>
          Name must only contain letters and spaces.
        </Text>
      )}

      <TextInput
        testID="inputBirthDate-Survey"
        placeholder="Birth Date (YYYY/MM/DD or YYYY.MM.DD)"
        value={birthDate}
        onChangeText={setBirthDate}
        onFocus={() => setTouchedFields((prev) => ({ ...prev, birthDate: true }))}
        style={styles.input}
      />
      {touchedFields.birthDate && birthDate.length > 0 && !isValidDate(birthDate) && (
        <Text testID="errorBirthDateInvalid" style={styles.error}>
          Invalid date format.
        </Text>
      )}
      {touchedFields.birthDate && isValidDate(birthDate) && !isValidAge(birthDate) && (
        <Text testID="errorBirthDateAgeInvalid" style={styles.error}>
          You must be at least 18 years old.
        </Text>
      )}

      <TextInput
        testID="inputCity-Survey"
        placeholder="City"
        value={city}
        onChangeText={setCity}
        onFocus={() => setTouchedFields((prev) => ({ ...prev, city: true }))}
        style={styles.input}
      />
      {touchedFields.city && city && !isValidCity(city) && (
        <Text testID="errorCityInvalid" style={styles.error}>
          City must only contain letters and spaces.
        </Text>
      )}

      <TextInput
        testID="selectEducationLevel-Survey"
        placeholder="Education Level"
        value={educationLevel}
        onChangeText={setEducationLevel}
        style={styles.input}
      />

      <TextInput
        testID="selectGender-Survey"
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />

      <TextInput
        testID="selectAIModelType-Survey"
        placeholder="AI Model Type (e.g., ChatGPT)"
        value={aiModelType}
        onChangeText={setAiModelType}
        style={styles.input}
      />

      <TextInput
        testID="inputProsCons-Survey"
        placeholder="Pros & Cons of AI Models"
        value={prosCons}
        onChangeText={setProsCons}
        onFocus={() => setTouchedFields((prev) => ({ ...prev, prosCons: true }))}
        style={styles.input}
        multiline
      />
      {touchedFields.prosCons && !isValidTextLength(prosCons) && (
        <Text testID="errorProsConsLength" style={styles.error}>
          Must be 10–250 characters.
        </Text>
      )}

      <TextInput
        testID="inputBeneficialUseCase-Survey"
        placeholder="Most Beneficial Use Case"
        value={beneficialUseCase}
        onChangeText={setBeneficialUseCase}
        onFocus={() => setTouchedFields((prev) => ({ ...prev, beneficialUseCase: true }))}
        style={styles.input}
        multiline
      />
      {touchedFields.beneficialUseCase && !isValidTextLength(beneficialUseCase) && (
        <Text testID="errorBeneficialUseCaseLength" style={styles.error}>
          Must be 10–250 characters.
        </Text>
      )}

      <Text style={styles.label}>Select AI Models Used:</Text>
      {aiModels.map((model) => (
        <View key={model} style={styles.checkboxContainer}>
          <CustomCheckbox
            testID={`checkbox-${model}`}
            value={selectedModels.includes(model)}
            onValueChange={() => toggleModelSelection(model)}
          />
          <Text testID={`label-${model}`} style={styles.checkboxLabel}>
            {model}
          </Text>
        </View>
      ))}

      {alreadySubmitted && (
        <Text testID="alreadySubmittedMessage" style={styles.success}>
          You have already submitted this survey.
        </Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          testID="buttonSubmit-Survey"
          title="Submit"
          onPress={handleSubmit}
          disabled={!isFormValid() || alreadySubmitted}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  heading: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  error: {
    color: '#d9534f',
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 14,
    width: '90%',
    maxWidth: 360,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16,
    color: '#444',
    alignSelf: 'center',
    width: '90%',
    maxWidth: 360,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '90%',
    maxWidth: 360,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#555',
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  success: {
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: 14,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SurveyScreen;
