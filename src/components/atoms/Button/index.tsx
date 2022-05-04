import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {LAYOUT} from '../../../lib/layout';
import {COLORS} from '../../../lib/colors';
import {Tmonster} from '../../../../globlalTypes';
import appDataStore from '../../../store/appDataStore';

type TbuttonBaseProps = {
  buttonStyle?: StyleProp<ViewStyle>;
};

const ButtonBase: React.FC<TbuttonBaseProps> = props => {
  return (
    <View style={[styles.button, LAYOUT.rowAllCenter, props.buttonStyle]}>
      {props.children}
    </View>
  );
};

export const OutlineButton: React.FC<TbuttonBaseProps> = props => {
  return (
    <ButtonBase
      buttonStyle={[
        LAYOUT.rowAllCenter,
        styles.outlineButton,
        props.buttonStyle,
      ]}>
      {props.children}
    </ButtonBase>
  );
};

export const SolidButton: React.FC<TbuttonBaseProps> = props => {
  return (
    <ButtonBase
      buttonStyle={[
        LAYOUT.rowAllCenter,
        styles.SolidButton,
        props.buttonStyle,
      ]}>
      {props.children}
    </ButtonBase>
  );
};

export default ButtonBase;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 15,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: COLORS.secondaryLight,
  },
  SolidButton: {
    backgroundColor: COLORS.secondaryLight,
  },
});

type TfavouriteButtonProps = {
  monster: Tmonster;
};

export const FavouriteButton: React.FC<TfavouriteButtonProps> = ({
  monster,
  children,
}) => {
  const [isFav, setIsFav] = React.useState(appDataStore.hasMonster(monster.id));

  const onPressHandler = () => {
    if (isFav) {
      appDataStore.removeMonster(monster.id);
      setIsFav(false);
    } else {
      appDataStore.addToHuntList(monster);
      setIsFav(true);
    }
  };

  return <Pressable onPress={onPressHandler}>{children}</Pressable>;
};
