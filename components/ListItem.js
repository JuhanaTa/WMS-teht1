import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line max-len
import {ListItem as NBListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon,
} from 'native-base';
import {deleteFile} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';

// url to api
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({item, navigation, editable}) => {
  const doDelete = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const result = await deleteFile(item.file_id, token);
      console.log('delete file: ' +result);
      navigation.replace('MyFiles');
    } catch (e) {
      console.error(e);
    }
  };
  console.log('ListItem');
  console.log(item);
  return (
    <NBListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{uri: mediaUrl + item.thumbnails.w160}}
        />
      </Left>
      <Body>
        <Text>{item.title}</Text>
        <Text note numberOfLines={1}>{item.description}</Text>
      </Body>
      <Right>
        <Button transparent onPress={
          () => {
            navigation.navigate('Single', {file: item});
          }}>
          <Icon name={'eye'}></Icon>
        </Button>
        {editable && <>
          <Button success transparent onPress={
            () => {
              navigation.navigate('Modify', {file: item});
            }}>
            <Icon name={'create'}></Icon>
          </Button>
          <Button warning transparent onPress={doDelete}>
            <Icon name={'trash'}></Icon>
          </Button>
        </>
        }
      </Right>
    </NBListItem>
  );
};


ListItem.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
  editable: PropTypes.bool,
};


export default ListItem;
