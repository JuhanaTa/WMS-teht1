import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Body,
  Button,
} from 'native-base';
import {getAvatar} from '../hooks/APIhooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(AuthContext);
  const [avatar, setAvatar] = useState([{filename: ''}]);

  const fetchAvatar = async () => {
    setAvatar(await getAvatar());
  };
  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log(avatar);

  console.log('logged in user data: ', user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    if (!isLoggedIn) {
      navigation.navigate('Login');
    }
  };

  return (

    <Container>
      <Content padder>
        { user &&
          <Card>
            <CardItem header bordered>
              <Icon name='person'></Icon>
              <Text>{user.username} </Text>
            </CardItem>
            <CardItem>
              <Image
                source={{uri: mediaUrl + avatar[0].filename}}
                style={{height: 400, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Fullname: {user.full_name}</Text>
                <Text>Email: {user.email}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Button block onPress={logout}>
                  <Text>Logout</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>}
      </Content>
    </Container>
  );
};


Profile.propTypes = {
  navigation: PropTypes.object,
};
export default Profile;
