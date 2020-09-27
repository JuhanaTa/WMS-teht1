/* eslint-disable max-len */
import ListItem from '../components/ListItem';
import React, {useContext} from 'react';
import {
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/APIhooks';
import {AuthContext} from '../contexts/AuthContext';
// url to api


const List = ({navigation, all}) => {
  const {user} = useContext(AuthContext);
  const mediaArray = useLoadMedia(all, user.user_id);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <ListItem navigation={navigation} item={item} editable={!all}></ListItem>
        );
      }}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  all: PropTypes.bool,
};

export default List;
