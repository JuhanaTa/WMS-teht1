/* eslint-disable max-len */
import ListItem from '../components/ListItem';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
} from 'react-native';

const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';


const List = () => {
  const [mediaArray, setMedia] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setMedia(json);
    } catch (e) {
      console.log('loadmedia error: ' + e);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <ListItem item={item}></ListItem>
        );
      }}
    />
  );
};


export default List;
