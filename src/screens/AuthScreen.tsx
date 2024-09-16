import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => setErrorMessage(error.message));
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 8,
  },
  error: {
    color: 'red',
  },
});

export default AuthScreen;
