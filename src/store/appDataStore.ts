import { action, computed, observable, makeObservable } from 'mobx'
import { create, persist } from 'mobx-persist'
import { AsyncStorage } from 'react-native'
import { Tmonster } from '../../globlalTypes';


class AppData { 

  constructor() {
    makeObservable(this);
  }

  @persist("list") @observable.deep huntList = [] as Tmonster[];

  @action
  addToHuntList(monster : Tmonster) {
    const tempList = this.huntList;
    tempList.push(monster);
    this.huntList = tempList;
  }

  @action
  removeMonster(monserId : string) {
    const tempList = this.huntList;
    tempList.splice(tempList.findIndex(monster => monster.id === monserId), 1);
    this.huntList = tempList;
  }

  @action
  clearHuntList() {
    this.huntList = [];
  }

}


let appDataStore = new AppData()

export default appDataStore
