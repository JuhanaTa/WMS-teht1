/* eslint-disable max-len */
import ListItem from '../components/ListItem';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
// url to api
const url = 'http://media.mw.metropolia.fi/wbma/';


const List = (props) => {
  const [mediaArray, setMedia] = useState([]);

  const loadMedia = async (limit) => {
    try {
      const response = await fetch(url + 'media?limit=' +limit);
      const json = await response.json();
      const media = await Promise.all(json.map(async (item) => {
        const response = await fetch(url + 'media/' + item.file_id);
        const json = await response.json();
        return json;
      }));
      console.log(media);
      setMedia(media);
    } catch (e) {
      console.log('loadmedia error: ' + e);
    }
  };

  useEffect(() => {
    loadMedia(10);
  }, []);

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
