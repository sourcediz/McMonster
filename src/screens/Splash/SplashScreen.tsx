import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import Logo from '../../components/atoms/Logo';
import {COLORS} from '../../lib/colors';
import rootStore from '../../store/rootStore';

export const WithSplashScreen = observer(
  ({children}: {children: React.ReactNode}) => {
    const [isAppReady, setIsAppReady] = useState(false);
    const root = rootStore;

    useEffect(() => {
      setTimeout(() => {
        setIsAppReady(true);
      }, 1000);

      if (root.hydrated) {
      }
    }, [root.hydrated]);

    return (
      <>
        {isAppReady && children}

        <Splash isAppReady={isAppReady} />
      </>
    );
  },
);

export const Splash = ({isAppReady}: {isAppReady: boolean}) => {
  if (isAppReady) {
    return null;
  }

  return (
    <Animated.View collapsable={false} style={[style.container]}>
      <Logo size={'L'} />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
