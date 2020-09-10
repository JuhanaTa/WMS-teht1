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

// url to api
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


const ListItem = (props) => {
  return (
    <NBListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{uri: mediaUrl + props.item.thumbnails.w160}}
        />
      </Left>
      <Body>
        <Text>{props.item.title}</Text>
        <Text note numberOfLines={1}>{props.item.description}</Text>
      </Body>
      <Right>
        <Button transparent onPress={
          () => {
            props.navigation.navigate('Single', {file: props.item});
          }}>
          <Icon name={'eye'}></Icon>
          <Text>View</Text>
        </Button>
      </Right>
    </NBListItem>
  );
};


ListItem.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
};


export default ListItem;
