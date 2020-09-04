/* eslint-disable max-len */
import ListItem from '../components/ListItem';
import React from 'react';
import {
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/APIhooks';
// url to api


const List = (props) => {
  const mediaArray = useLoadMedia();
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <ListItem navigation={props.navigation} item={item}></ListItem>
        );
      }}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
