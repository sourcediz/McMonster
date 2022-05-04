import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Tlocation, Tmonster} from '../../../../globlalTypes';
import {COLORS} from '../../../lib/colors';
import {LAYOUT} from '../../../lib/layout';
import {monsterIMG} from '../../../../public/images/monsters';
import {FONTS, H1, H4, H6} from '../../../lib/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {convertThousands} from '../../../../utils/monsters/units';
import {FavouriteButton, SolidButton} from '../Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import appDataStore from '../../../store/appDataStore';
import {observer} from 'mobx-react';

type TmonsterCardProps = {
  monster: Tmonster;
  setMapLocation?: (location: Tlocation) => void;
};

const MonsterCard: React.FC<TmonsterCardProps> = observer(
  ({monster, setMapLocation}) => {
    const navigation = useNavigation();
    const huntStore = appDataStore;
    const onViewHandler = () => {
      navigation.navigate('singleView', {monster});
    };

    const onLocaterHandler = () => {
      if (setMapLocation) {
        setMapLocation(monster.location);
      } else {
        navigation.navigate('Map', {monster});
      }
    };

    React.useEffect(() => {}, [huntStore.huntList]);

    return (
      <View style={styles.card}>
        <View style={[LAYOUT.rowAlignCenterBetween]}>
          <View>
            <Image
              source={monsterIMG[monster.name]}
              style={[styles.thumbnail]}
              resizeMode={'cover'}
            />
          </View>

          <View style={{width: '70%'}}>
            <View style={[LAYOUT.rowAlignCenterBetween]}>
              <H6
                fontStyle={[FONTS.Bubble]}
                text={`Mc ${monster.type} ${monster.name}`}
              />
              <FavouriteButton monster={monster}>
                {!huntStore.hasMonster(monster.id) ? (
                  <Icon
                    name="star-outline"
                    size={25}
                    color={COLORS.secondaryLight}
                  />
                ) : (
                  <Icon name="star" size={25} color={COLORS.secondaryLight} />
                )}
              </FavouriteButton>
            </View>

            <View style={[LAYOUT.rowAlignCenter]}>
              <View style={[LAYOUT.rowAlignCenter, styles.statContainer]}>
                <Icon name="aperture" size={25} color={COLORS.secondaryLight} />
                <H6 fontStyle={[FONTS.Bubble]} text={`${monster.attack}`} />
              </View>
              <View style={[LAYOUT.rowAlignCenter, styles.statContainer]}>
                <Icon
                  name="speedometer"
                  size={25}
                  color={COLORS.secondaryLight}
                />
                <H6 fontStyle={[FONTS.Bubble]} text={`${monster.speed}`} />
              </View>
            </View>
            <View style={[LAYOUT.rowAlignCenter, styles.statContainer]}>
              <Icon name="heart" size={25} color={COLORS.secondaryLight} />
              <H6
                fontStyle={[FONTS.Bubble]}
                text={`${convertThousands(monster.hp)} / ${convertThousands(
                  monster.hp,
                )} `}
              />
            </View>

            <View style={[LAYOUT.rowAlignCenterBetween, {marginTop: 10}]}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onViewHandler}>
                  <SolidButton buttonStyle={styles.buttonStyle}>
                    <Text style={styles.buttonText}>View</Text>
                  </SolidButton>
                </TouchableOpacity>

              <Pressable
                onPress={onLocaterHandler}
                style={styles.buttonContainer}>
                <SolidButton buttonStyle={styles.buttonStyle}>
                  <Text style={styles.buttonText}>Locate</Text>
                </SolidButton>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  },
);

export default MonsterCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: COLORS.mainLight,
    padding: 10,
  },
  thumbnail: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: 8,
  },
  statContainer: {
    paddingRight: 10,
  },
  buttonContainer: {
    width: '48%',
  },
  buttonStyle: {
    paddingVertical: 10,
  },
  buttonText: {
    ...FONTS.Bubble,
    color: COLORS.main,
  },
})
