import List from '../components/List';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const MyFiles = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} all={false}></List>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
