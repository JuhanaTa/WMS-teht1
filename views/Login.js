import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postLogin, checkToken} from '../hooks/APIhooks';

const Login = (props) => { // props is needed for navigation
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  console.log('Login', isLoggedIn);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        console.log('token valid', userData);
        setIsLoggedIn(true);
      } catch (e) {
        console.log('token check error ', e.message);
      }
      // props.navigation.navigate('Home');
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const logIn = async () => {
    try {
      const userData = await postLogin({
        username: 'Juhana',
        password: 'WBMS2020!',
      });
      console.log('user: ' + userData);
      console.log('token: ' + userData.token);

      await AsyncStorage.setItem('userToken', userData.token);
    } catch (e) {
      console.log('login error ', e.message);
    }
    setIsLoggedIn(true);
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
