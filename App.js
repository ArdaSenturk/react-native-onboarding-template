/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Onboard from './App/Screens/onboard';
import theme, {COLOR} from './App/Components/theme';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={[
        backgroundStyle,
        {flex: 1, alignItems: 'center', justifyContent: 'center'},
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Onboard
        bgStyle={{
          backgroundColor: isDarkMode ? COLOR.dark : COLOR.lighter,
        }}
      />
    </SafeAreaView>
  );
};

export default App;
