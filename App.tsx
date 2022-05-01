import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { ScreenProvider } from 'responsive-native';
import { COLORS } from './src/lib/colors';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider style={{ flex: 1 }}>
            <CustomStatusBar isDarkMode={isDarkMode} />
            <View style={[{flex : 1},backgroundStyle]}>
            <ScreenProvider baseFontSize={16}  >
              <NavigationContainer>
                <TabNavigator/>
              </NavigationContainer>
        </ScreenProvider> 
      </View>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
});

export default App;
