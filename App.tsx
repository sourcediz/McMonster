import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { ScreenProvider } from 'responsive-native';
import { COLORS } from './src/lib/colors';
import { NavigationContainer } from '@react-navigation/native';


import { observer, Provider } from 'mobx-react';
import rootStore from './src/store/rootStore';
import { RootNavigator } from './src/navigation/RootNavigator';
import { WithSplashScreen } from './src/screens/Splash/SplashScreen';

const CustomStatusBar : React.FC<{isDarkMode : boolean}> = ({isDarkMode}) => {
  const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
  return(
  <View style={[{height : APPBAR_HEIGHT, backgroundColor : COLORS.secondary }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={COLORS.secondary} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  </View>
  )
};

const App = observer(() => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.main : COLORS.main,
  };


  return (
    <Provider {...rootStore}>
      <WithSplashScreen >
    <SafeAreaProvider style={{ flex: 1 }}>
            <CustomStatusBar isDarkMode={isDarkMode} />
            <View style={[{flex : 1},backgroundStyle]}>
            <ScreenProvider baseFontSize={16}  >
      <NavigationContainer >
                <RootNavigator  />
              </NavigationContainer>
        </ScreenProvider> 
      </View>
    </SafeAreaProvider>
    </WithSplashScreen>
    </Provider>
  );
});

const styles = StyleSheet.create({
});

export default App;
