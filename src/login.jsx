import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('Survey');
    } else {
      alert('Please enter email and password');
    }
  };

  // testIDs are input fields to be used for accessibility on pageObjects/LoginPageModel.page.js
  return (
    <View>
      <Text>Login</Text>
      {/* <TextInput placeholder="Email" value={email} onChangeText={setEmail} />  */}
      {/* <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry /> */}
      {/* <Button title="Login" onPress={handleLogin} /> */}
      
      <TextInput testID="inputEmail-Login" placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput testID="inputPassword-Login" placeholder="Password" value={password} onChangeText={setPassword} />
      <Button testID="inputLoginButton-Login"  title="Login" onPress={handleLogin} />

    </View>
  );
};

export default LoginScreen;
