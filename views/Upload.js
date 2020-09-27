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
  Spinner} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line no-unused-vars
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {upload, appIdentifier, postTag} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Video} from 'expo-av';


const Upload = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fileType, setFileType] = useState('image');

  const doUpload = async () => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);

      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      let type = match ? `${fileType}/${match[1]}` : fileType;
      if (type === 'image/jpg') type = 'image/jpeg';


      formData.append('file', {uri: image, name: filename, type});
      // haetaa tokeni
      const userToken = await AsyncStorage.getItem('userToken');
      // uploadi
      const resp = await upload(formData, userToken);
      console.log('image uploaded next is tag');
      const postTagResponse = await postTag({
        file_id: resp.file_id,
        tag: appIdentifier,
      }, userToken);

      console.log('posting tag: ', postTagResponse);

      setTimeout(() => {
        doReset();
        navigation.replace('MyFiles');
        setLoader(false);
      }, 2000);
    } catch (e) {
      console.log('error: ', e);
    }
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
        setFileType(result.type);
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
        {image &&
          <>
            {fileType === 'image' ?
              <Image
                source={{uri: image}}
                style={{height: 400, width: null, flex: 1}}
              /> :
              <Video
                source={{uri: image}}
                style={{height: 400, width: null, flex: 1}}
                useNativeControls={true}
              />
            }
          </>
        }
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
        {loader && <Spinner />}
        <Button block
          onPress={doReset}>
          <Text>Reset</Text>
        </Button>


      </Content>
    </Container>
  );
};


Upload.propTypes = {
  route: PropTypes.object,
};


export default Upload;
