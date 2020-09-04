import React, {useContext} from 'react';
import {
  View,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postLogin} from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';

const LoginForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(AuthContext);

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      console.log('user: ' + userData);
      console.log('token: ' + userData.token);
      console.log('name: ' + userData.username);
      console.log('email: ' + userData.email);
      await AsyncStorage.setItem('userToken', userData.token);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (e) {
      console.log('login error ', e.message);
    }
  };

  const {handleInputChange, inputs} = useLoginForm();

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login!" onPress={doLogin}/>
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
