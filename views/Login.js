import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/APIhooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Container, Content, Button, Text, View} from 'native-base';

const Login = (props) => { // props is needed for navigation
  const {setIsLoggedIn, setUser, user} = useContext(AuthContext);
  const [showRegistration, setShowRegister] = useState(true);


  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        console.log('token valid', userData);
        setIsLoggedIn(true);
        setUser(userData);
      } catch (e) {
        console.log('token check error ', e.message);
      }
      props.navigation.navigate('Home');
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  console.log('user login.js: ' + user);
  return (
    <Container >
      <Content padder>
        {showRegistration ?
          <LoginForm navigation={props.navigation} /> :
          <RegisterForm navigation={props.navigation} />
        }
        <View style={{alignItems: 'center'}}>
          <Text> {showRegistration ? 'No account yet?' : ''}</Text>
        </View>
        <Button block onPress={() => {
          setShowRegister(!showRegistration);
        }}>
          <Text> {showRegistration ? 'Register' : 'Login'}</Text>
        </Button>

      </Content>
    </Container>
  );
};


Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
