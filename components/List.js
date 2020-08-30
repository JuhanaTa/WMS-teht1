/* eslint-disable max-len */
import ListItem from '../components/ListItem';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
} from 'react-native';
// url to api
const url = 'http://media.mw.metropolia.fi/wbma/';


const List = () => {
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
    loadMedia(5);
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
