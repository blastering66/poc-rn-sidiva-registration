/**
 * Sidiva Registration POC
 *
 * @format
 */

import React, {useState, useCallback, useEffect} from 'react';
import {
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

const WEBVIEW_URL = 'https://www.smartfren.com/activation';
const INJECTED_JS = 'window.AUTH_TOKEN = "Bearer abc123"; true';

function App(): React.JSX.Element {
  const [inputJWT, setInputJWT] = useState('');
  const [currentURL, setCurrentURL] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      setCurrentURL(WEBVIEW_URL);
    } catch (error: unknown) {
      console.log('Error submitting JWT:', error);
    }
  }, [inputJWT]);

  const reset = useCallback(() => {
    setInputJWT('');
    setCurrentURL('');
  }, []);

  const renderWebView = useCallback(() => {
    if (inputJWT === '' || currentURL === '') return null;
    const currentInjectJS = `window.AUTH_TOKEN = "Bearer ${inputJWT}"; true`;
    console.log('Injected JS:', currentInjectJS);
      return (
        <WebView
          style={styles.webview}
          source={{uri: currentURL}}
          injectedJavaScript={currentInjectJS}
          onNavigationStateChange={navState => {
            console.log('URL Changed:', navState?.url);
          }}
        />
      );
  }, [inputJWT, currentURL]);

  useEffect(() => {
    console.log('Current URL:', currentURL);
    console.log('Input JWT:', inputJWT);
  }, [currentURL, inputJWT]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input JWT Token"
          value={inputJWT}
          onChangeText={setInputJWT}
        />
        <View style={{flexDirection: 'row', gap: 10}}>
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Reset" onPress={reset} />
        </View>
      </View>
      {renderWebView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
