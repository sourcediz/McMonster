import { action, computed, observable, makeObservable } from 'mobx'
import { create, persist } from 'mobx-persist'
import { AsyncStorage } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
export class UserObject {
  @persist @observable uid? = '';
  @persist @observable name? = '';
  @persist @observable roles? = '';
}

class Auth { 

  constructor() {
    makeObservable(this);
  }

  @persist @observable authToken = '';
  @persist @observable uid = -1;
  @persist @observable refreshToken = '';
  @persist @observable csrfToken = '';
  @persist @observable logoutToken = '';
  @persist @observable name = '';
  @persist @observable hasObBoarded = false;
  @persist @observable allowedLocation = false;
  @observable allowedLocationTemp = false;



 
  // @computed get fullName() {
  //   if (!this.user?.firstName) return ''
  //   const names = [this.user.firstName, this.user.lastName].join(' ')
  //   return names
  // }

  // @computed get firstName() {
  //   if (!this.user?.firstName) return ''
  //   return this.user.firstName
  // }

  @computed get getToken() {
    return this.authToken
  }

  @computed get getRefreshToken() {
    return this.refreshToken
  }



  @action
  setAuthToken(token: string) {
    this.authToken = token
  }

  @action
  setOnboarded(flag : boolean) {
    this.hasObBoarded = flag
  }

  @action
  setCsrfToken(token: string) {
    this.csrfToken = token
  }

  @action
  setUid(uid: number) {
    this.uid = uid
  }

  @action
  setLogoutToken(token: string) {
    this.logoutToken = token
  }

  @action
  locationEnabled() {
    console.log("full set")
    this.allowedLocation = true
  }
  @action
  locationEnabledTemp() {
    console.log("temp set")
    this.allowedLocationTemp = true
  }


  @action
  logout() {
      this.authToken = ''
    this.csrfToken = '';
    this.hasObBoarded = false;
  }
}


let authStore = new Auth()

export default authStore
