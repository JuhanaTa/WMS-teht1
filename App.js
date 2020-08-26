/* eslint-disable max-len */
import List from './components/List';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List></List>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
});

export default App;
