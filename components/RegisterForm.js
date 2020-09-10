import React, {useContext} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postRegistration, postLogin} from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {Button, Text} from 'native-base';

const RegisterForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(AuthContext);

  const doRegister = async () => {
    try {
      const result = await postRegistration(inputs);
      console.log('new user created: ' + result);
      const userData = await postLogin({
        username: inputs.username,
        password: inputs.password,
      });
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
    } catch (e) {
      console.log('register error ', e.message);
    }
  };

  const {handleInputChange, inputs} = useSignUpForm();
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
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button block onPress={doRegister}>
        <Text>Register</Text>
      </Button>
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
