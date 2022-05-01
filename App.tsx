import React from 'react';
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


import { Provider } from 'mobx-react';
import rooteStore from './src/store/rooteStore';
import { RootNavigator } from './src/navigation/RootNavigator';

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

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.main : COLORS.main,
  };

  return (
    <Provider {...rooteStore}>
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
    </Provider>
  );
};

const styles = StyleSheet.create({
});

export default App;
