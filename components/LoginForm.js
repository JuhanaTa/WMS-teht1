import React, {useContext} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postLogin} from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {Button, Text} from 'native-base';

const LoginForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(AuthContext);

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      setUser(userData.user);
      console.log('user: ' + userData);
      console.log('token: ' + userData.token);
      await AsyncStorage.setItem('userToken', userData.token);
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
      <Button block onPress={doLogin}>
        <Text>login</Text>
      </Button>

    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
