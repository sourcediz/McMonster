import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {COLORS} from './colors';

type TconatinerProps = {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
};

export const Wrapper: React.FC = props => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.main}}>
      {props.children}
    </View>;
  );
};

export const Container: React.FC<TconatinerProps> = ({
  children,
  justifyContent,
}) => {
  return (
    <View
      style={[
        containerStyle,
        {justifyContent: justifyContent ? justifyContent : 'space-around'},
      ]}>
      {children}
    </View>;
  );
};

const containerStyle: StyleProp<ViewStyle> = {
  flex: 1,
  width: '90%',
  alignSelf: 'center',
};


const row: StyleProp<ViewStyle> = {
  flexDirection: 'row',
};

const rowAlignCenter: StyleProp<ViewStyle> = {
  ...row,
  alignItems: 'center',
};
const rowAllCenter: StyleProp<ViewStyle> = {
  ...row,
  alignItems: 'center',
  justifyContent: 'center',
};

const rowAlignCenterBetween: StyleProp<ViewStyle> = {
  ...rowAlignCenter,
  justifyContent: 'space-between',
};

export const LAYOUT = {
  row,
  rowAlignCenter,
  rowAlignCenterBetween,
  rowAllCenter,
}
