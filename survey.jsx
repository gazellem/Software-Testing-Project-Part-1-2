import React, { useState } from 'react';
import { View, Text, TextInput, Button, CheckBox } from 'react-native';

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

  const handleSubmit = () => {
    const surveyData = { name, birthDate, city, selectedModels };
    console.log('Survey Submitted:', surveyData);
  };

  return (
    <View>
      <Text>Survey</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Birth Date" value={birthDate} onChangeText={setBirthDate} />
      <TextInput placeholder="City" value={city} onChangeText={setCity} />

      <Text>Select AI Models Used:</Text>
      {aiModels.map(model => (
        <View key={model}>
          <CheckBox value={selectedModels.includes(model)} onValueChange={() => toggleModelSelection(model)} />
          <Text>{model}</Text>
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default SurveyScreen;
