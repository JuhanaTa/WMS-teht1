
import {useState, useEffect} from 'react';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const useLoadMedia = () => {
  const [mediaArray, setMedia] = useState([]);
  const loadMedia = async (limit) => {
    try {
      const response = await fetch(apiUrl + 'media');
      const json = await response.json();
      const media = await Promise.all(json.map(async (item) => {
        const resp2 = await fetch(apiUrl + 'media/' + item.file_id);
        const json2 = await resp2.json();
        return json2;
      }));
      setMedia(media);
    } catch (e) {
      console.log('loadmedia error: ' + e);
    }
  };

  useEffect(()=>{
    loadMedia();
  }, []);

  return mediaArray;
};

const postLogin = async (userCredentials) => {
  console.log('credentials: ' +userCredentials);
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userCredentials),
  };
  try {
    const response = await fetch(apiUrl+ 'login', options);
    const userData = await response.json();
    if (response.ok) {
      return userData;
    } else {
      throw new Error(userData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const postRegistration = async (newUser) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser),
  };
  try {
    console.log('new user: ' +newUser);
    const response = await fetch(apiUrl+ 'users', options);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkToken = async (token) => {
  const options = {
    method: 'GET',
    headers: {'x-access-token': token},
  };
  try {
    const response = await fetch(apiUrl+ 'users/user', options);
    const userData = await response.json();
    if (response.ok) {
      return userData;
    } else {
      throw new Error(userData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export {useLoadMedia, postLogin, postRegistration, checkToken};
