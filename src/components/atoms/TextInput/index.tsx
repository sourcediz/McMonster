import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {LAYOUT} from '../../../lib/layout';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../lib/colors';
import {useRem} from 'responsive-native';
type TbaseTextInputProps = {
  placeholder?: string;
  hidePassword?: boolean;
};

interface TiconTextInput extends TbaseTextInputProps {
  iconLeft?: string;
  iconRight?: string;
}

export const BaseTextInput: React.FC<TbaseTextInputProps> = React.forwardRef(
  (props, ref) => {
    const [text, setText] = React.useState<string>('');
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const rem = useRem();
    const handleFocus = () => {
      setIsFocused(true);
      return;
    };

    const handleBlur = () => {
      if (text.length === 0) {
        setIsFocused(false);
      }
    };

    return (
      <TextInput
        ref={ref}
        value={text}
        onChangeText={setText}
        placeholderTextColor={COLORS.action + '55'}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={!props.hidePassword}
        style={[
          styles.input,
          isFocused && styles.inputActive,
          {fontSize: rem(1.5)},
        ]}
        placeholder={props.placeholder}
      />
    );
  },
);

export const IconTextInput: React.FC<TiconTextInput> = props => {
  return (
    <View style={[LAYOUT.rowAlignCenter]}>
      {props.iconLeft && (
        <View style={styles.leftIcon}>
          <Icon
            name={props.iconLeft}
            size={30}
            color={COLORS.secondary}
            style={[{paddingRight: 15}]}
          />
        </View>
      )}
      <BaseTextInput placeholder={props.placeholder} />
    </View>
  );
};

export const PasswordTextInput: React.FC<TiconTextInput> = props => {
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);

  return (
    <View style={[LAYOUT.rowAlignCenter]}>
      <View style={styles.leftIcon}>
        <Icon
          name={'lock-closed-outline'}
          size={30}
          color={COLORS.secondary}
          style={[{paddingRight: 15}]}
        />
      </View>
      <BaseTextInput
        hidePassword={hidePassword}
        placeholder={props.placeholder}
      />

      <Pressable
        style={styles.rightIcon}
        onPress={() => {
          setHidePassword(!hidePassword);
        }}>
        <Icon
          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          size={30}
          color={COLORS.secondary}
          style={[{paddingHorizontal: 15}]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: COLORS.secondaryLight + '55',
    borderBottomWidth: 3,
    flex: 1,
    color: '#fff',
    padding: 5,
  },
  rightIcon: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.secondaryLight,
    height: '100%',
  },
  leftIcon: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.secondaryLight + '00',
  },
  inputActive: {
    borderBottomColor: COLORS.secondaryLight,
  },
});
