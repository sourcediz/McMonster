import { create } from 'mobx-persist';
// import { AsyncStorage } from 'react-native';

import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from './userStore';
import appData from './appDataStore';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

class RootStore {
  @observable hydrated = false
    
  AuthStore = auth;
  AppDataStore = appData;

  constructor() {
    Promise.all([
      hydrate('auth', this.AuthStore),
      hydrate('apData', this.AppDataStore),
    ])
      .then(() => (this.hydrated = true))
  }
};

export default new RootStore();