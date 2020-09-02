import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import PropTypes from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (props) => {
  const {file} = props.route.params;
  console.log('filu: ' +file.thumbnails.w160);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{file.title}</Text>
      <View style={styles.imageBox}>
        <Image
          style={[styles.image, styles.position]}
          source={{uri: mediaUrl + file.thumbnails.w160}}
        />
      </View>
      <Text style={styles.text}>{file.description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '70%',
    height: '70%',
    marginLeft: '15%',
    marginRight: '15%',

  },
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
  },

});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
