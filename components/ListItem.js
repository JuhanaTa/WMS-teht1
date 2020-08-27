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
          style={[styles.image, styles.position]}
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
    margin: 10,
    flex: 1,
  },
  info: {
    margin: 12,
    flex: 2,
  },
  kittenContainer: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    marginTop: 5,
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  text: {
    fontSize: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  position: {

  },
});

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
