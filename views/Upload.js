/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Image, Platform} from 'react-native';
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  Card,
  CardItem} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line no-unused-vars
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {upload} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';


const Upload = ({navigation}) => {
  const [image, setImage] = useState(null);

  const doUpload = async () => {
    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);

    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    if (type === 'image/jpg') type = 'image/jpeg';

    formData.append('file', {uri: image, name: filename, type});
    // haetaa tokeni
    const userToken = await AsyncStorage.getItem('userToken');
    // uploadi
    console.log(formData);
    const resp = await upload(formData, userToken);
    console.log('Upload ', resp);
    setTimeout(() => {
      doReset();
      navigation.push('Home');
    }, 2000);
  };

  const {
    handleInputChange,
    uploadErrors,
    inputs,
    reset,
  } = useUploadForm();

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);


  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const doReset = () => {
    reset();
    setImage(null);
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
          onPress={pickImage}>
          <Text>Select Image</Text>
        </Button>
        <Button block style={{marginBottom: 10}}
          disabled={uploadErrors.title !== null ||
          uploadErrors.description !== null || image === null
          } onPress={doUpload}>
          <Text>Upload</Text>
        </Button>
        <Button block
          onPress={doReset}>
          <Text>Reset</Text>
        </Button>
        <Card>
          <CardItem
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {image && <Image source={{uri: image}}
              style={{width: 300, height: 300}} />}
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};


Upload.propTypes = {
  route: PropTypes.object,
};


export default Upload;
