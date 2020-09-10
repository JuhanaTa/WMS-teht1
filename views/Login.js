import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/APIhooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Container, Content} from 'native-base';

const Login = (props) => { // props is needed for navigation
  const {setIsLoggedIn, setUser, user} = useContext(AuthContext);

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
  console.log('user login.js: '+user);
  return (
    <Container >
      <Content padder>
        <LoginForm navigation={props.navigation}/>
        <RegisterForm navigation={props.navigation}/>
      </Content>
    </Container>
  );
};


Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
