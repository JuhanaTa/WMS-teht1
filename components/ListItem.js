import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.kittenContainer}>
      <View style={styles.cat}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: props.item.thumbnails.w160}}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.text}>{props.item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cat: {
    width: '30%',
    marginLeft: 30,
    marginTop: 30,
  },
  info: {
    width: '65%',
  },

  kittenContainer: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 25,
  },
  text: {
    fontSize: 15,
  },
});

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
