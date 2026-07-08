/**
 * Sidiva Registration POC
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';

const API_URL = 'https://example.com/api/register';
const WEBVIEW_URL = 'https://www.myweb.com';
const INJECTED_JS = 'window.AUTH_TOKEN = "Bearer abc123"; true';

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(API_URL, {data: inputValue});
      Alert.alert('Success', JSON.stringify(response.data));
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) && error.message
          ? error.message
          : 'An unexpected error occurred';
      Alert.alert('Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <WebView
        style={styles.webview}
        source={{uri: WEBVIEW_URL}}
        injectedJavaScript={INJECTED_JS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  webview: {
    flex: 1,
  },
});

export default App;
