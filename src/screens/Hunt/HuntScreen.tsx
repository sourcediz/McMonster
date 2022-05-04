import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Container, Wrapper} from '../../lib/layout';
import {FlatList} from 'react-native-gesture-handler';
import MonsterCard from '../../components/atoms/MonsterCard/MonsterCard';
import {FONTS, H1, H2, H5} from '../../lib/fonts';
import {observer} from 'mobx-react';
import {Tmonster} from '../../../globlalTypes';
import appDataStore from '../../store/appDataStore';
import {COLORS} from '../../lib/colors';

const HuntScreen: React.FC = observer(props => {
  const [monsters, setMonsters] = React.useState<Tmonster[]>([]);
  const huntStore = appDataStore;
  React.useEffect(() => {
    setMonsters(huntStore.huntList);
  }, [huntStore.huntList]);


    return (
    <Wrapper>
      <Container>
        <H2
          fontStyle={[FONTS.Bubble, {paddingVertical: 30}]}
          text={`Hunt List `}
        />

        {monsters.length > 0 ? (
          <FlatList
            data={monsters}
            renderItem={({item}) => (
              <View style={{paddingBottom: 20}}>
                <MonsterCard monster={item} />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
            <H5
              fontStyle={{color: COLORS.secondaryLight, textAlign: 'center'}}
              text={'You have no monsters on your hunt list'}
            />
          </View>

      </Container>
    </Wrapper>
  );
});



export default HuntScreen;

const styles = StyleSheet.create({});




// if (Platform.OS === 'ios') {
//     return getOneTimeLocation(setGeoLoaction);
// } else {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Access Required',
//         message: 'This App needs to Access your location',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       //To Check, If Permission is granted
//       getOneTimeLocation();
//     } else {
//     //   setLocationStatus('Permission Denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }
