// App.tsx (in your root directory)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Corrected import paths based on the directory structure
import LoginScreen from './(tabs)/index';  // Login screen in the tabs folder
import SurveyScreen from './(auth)/survey';  // Survey screen in the auth folder

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
