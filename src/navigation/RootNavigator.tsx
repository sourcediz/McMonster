import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from '../screens/List/ListScreen';
import MapScreen from '../screens/Map/MapScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import Signup from '../screens/Signup/SignupScreen';
import { COLORS } from '../lib/colors';

//create root stack and show tabnavigator if authenticated
const Root = createStackNavigator();

export const RootNavigator = () =>{
    const isAuth = true; //temp auth flag
    return(
        <Root.Navigator 
        
    screenOptions={{
        cardStyle : {
            backgroundColor : COLORS.main 
            },
        headerShown : false,
        
    }} >
        {isAuth ? (
            <Root.Screen name="app" component={TabNavigator} />
        ) : (
            <Root.Screen name="auth" component={AuthNavigator} />
        )}

      </Root.Navigator>
    )
}

const AuthStack = createStackNavigator();

export const AuthNavigator = () =>{
    return(
        <AuthStack.Navigator 
         
        screenOptions={{
            cardStyle : {
                backgroundColor : COLORS.main 
                },
            headerShown : false,
            
        }}>
        <AuthStack.Screen name="login" component={LoginScreen} />
        <AuthStack.Screen name="signup" component={Signup} />
      </AuthStack.Navigator>
    )
}



const TabStack = createBottomTabNavigator();
export const TabNavigator = ()=> {
  return (
    <TabStack.Navigator 
         
    screenOptions={{
        headerShown : false,
        
    }}>
        <TabStack.Screen name="monsters" component={ListScreen} />
        <TabStack.Screen name="map" component={MapScreen} />
      </TabStack.Navigator>
  );
}
