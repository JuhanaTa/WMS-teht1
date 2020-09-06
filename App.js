import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {yeet} from './app.json'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! THis is test</Text>
      <Text>Niklas was here</Text>
      <Text>This is just testing for github task</Text>
      <button>this is some random button</button>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

