import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {FONTS, H1, H2, H3, H4, H5, H6} from '../../lib/fonts';
import {Container, LAYOUT} from '../../lib/layout';
import Logo from '../../components/atoms/Logo';
import {COLORS} from '../../lib/colors';
import {
  IconTextInput,
  PasswordTextInput,
} from '../../components/atoms/TextInput';
import ButtonBase, {OutlineButton} from '../../components/atoms/Button';
import authStore from '../../store/userStore';
import {TouchableOpacity} from 'react-native-gesture-handler';
const LoginScreen = () => {
  const user = authStore;
  const guestHandler = () => {
    user.setAuthToken('guest');
  };

  return (
    <Container>
      <View style={LAYOUT.rowAllCenter}>
        <View>
          <Logo size="L" />
          <H5 text="McMonsters" fontStyle={[FONTS.Bubble, styles.subTitle]} />
        </View>
      </View>

      <View>
        <View>
          <H1 text="Login" fontStyle={[FONTS.Bubble, styles.header]} />
        </View>
        <IconTextInput iconLeft="person-outline" placeholder="Username" />
        <View style={{paddingTop: 40}}>
          <PasswordTextInput placeholder="Passowrd" />
        </View>
      </View>

      <View>
        <OutlineButton>
          <H5 text="Login" fontStyle={{color: COLORS.secondaryLight}} />
          {/* <Text>Continue</Text> */}
        </OutlineButton>
      </View>

      <TouchableOpacity onPress={guestHandler} style={[LAYOUT.rowAllCenter]}>
        <H6
          text="Not a Hunter?"
          fontStyle={[{color: COLORS.mainLight}, FONTS.Bubble]}
        />
        <H6
          text="Continue as a guest"
          fontStyle={[styles.register, FONTS.Bubble]}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    color: COLORS.secondaryLight,
    letterSpacing: 1.5,
    paddingBottom: 20,
  },
  subTitle: {
    color: COLORS.secondaryLight,
    letterSpacing: 1.5,
    textAlign: 'center',
    marginTop: -35,
  },
  register: {
    paddingLeft: 5,
    color: COLORS.secondaryLight,
  },
});
