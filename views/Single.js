import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {Container,
  Card,
  CardItem,
  Left, Icon,
  Text,
  Content} from 'native-base';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (props) => {
  const {file} = props.route.params;
  console.log('filu: ' + file.thumbnails.w160);
  return (

    <Container>
      <Content padder>
        <Card>
          <CardItem>
            <Left>
              <Icon name={'image'} />
              <Text>{file.title}</Text>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: mediaUrl + file.thumbnails.w160}}
              style={{height: 400, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Text>
              {file.description}
            </Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};


Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
