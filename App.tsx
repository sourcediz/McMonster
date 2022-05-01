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
import { H1 } from './src/components/fonts';
import { COLORS } from './src/lib/colors';
import LoginScreen from './src/screens/Login/LoginScreen';
import setDefaults from './utils/setDefaults';

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
    <SafeAreaProvider style={{ flex: 1 }}>
            <CustomStatusBar isDarkMode={isDarkMode} />
            <View style={[{flex : 1},backgroundStyle]}>
            <ScreenProvider baseFontSize={16}  >
              <LoginScreen />
        </ScreenProvider> 
      </View>
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
});

export default App;
