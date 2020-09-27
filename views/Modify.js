/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  Spinner} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
// eslint-disable-next-line no-unused-vars
import Constants from 'expo-constants';
import {updateFile} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';


const Modify = ({navigation, route}) => {
  const {file} = route.params;
  const [loader, setLoader] = useState(false);

  const doModify = async () => {
    setLoader(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token: ' + userToken);
      const result = await updateFile(file.file_id, inputs, userToken);
      console.log('update file info: '+result);
      setTimeout(() => {
        doReset();
        navigation.navigate('Home');
        setLoader(false);
      }, 2000);
    } catch (e) {
      console.log('update error: ', e);
      setLoader(false);
    }
  };

  useEffect(() => {
    setInputs({
      title: '',
      description: '',
    });
  }, []);

  const {
    handleInputChange,
    uploadErrors,
    inputs,
    reset,
    setInputs,
  } = useUploadForm();


  const doReset = () => {
    reset();
  };


  return (
    <Container>
      <Content padder>

        <Form>
          <FormTextInput
            autoCapitalize="none"
            placeholder="title"
            value={inputs.title}
            onChangeText={(txt) => handleInputChange('title', txt)}
            error={uploadErrors.title}

          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="description"
            value={inputs.description}
            onChangeText={(txt) => handleInputChange('description', txt)}
            error={uploadErrors.description}

          />
        </Form>
        <Button block style={{marginBottom: 10}}
          disabled={uploadErrors.title !== null ||
          uploadErrors.description !== null }
          onPress={doModify}>
          <Text>Save</Text>
        </Button>
        {loader && <Spinner />}
        <Button block
          onPress={doReset}>
          <Text>Reset</Text>
        </Button>


      </Content>
    </Container>
  );
};


Modify.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};


export default Modify;
