import { AsyncStorage } from 'react-native';

const Keys = {
  TEMP_STORAGE: 'temp_storage'
}

const storage = {
  get: key => {
    try {
      let value = AsyncStorage.getItem(key);
      return value;
    } catch (er) {
      // todo: handle error catching
    }
  },
  set: (key, value) => {
    AsyncStorage.set(key, value);
  },
  Keys: Keys
};

export default storage;