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
import SingleView from '../screens/SingleView/SingleView';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HuntScreen from '../screens/Hunt/HuntScreen';
import { observer } from 'mobx-react';
import authStore from '../store/userStore';
import EnableLocation from '../screens/EnableLocation/EnableLocation';

//create root stack and show tabnavigator if authenticated
const Root = createStackNavigator();

export const RootNavigator = observer(() => {
  const user = authStore
  console.log("temp : ",authStore.allowedLocationTemp, "always : ", authStore.allowedLocation)
  return (
    <Root.Navigator

      screenOptions={{
        cardStyle: {
          backgroundColor: COLORS.main
        },
        headerShown: false,

      }} >
      {user.authToken ? 
        <>
          {(user.allowedLocation || user.allowedLocationTemp) ?
            <>
              <Root.Screen name="app" component={TabNavigator} />
              <Root.Group screenOptions={{ presentation: 'modal' }} >
                <Root.Screen name="singleView" component={SingleView} />
              </Root.Group>
            </>
            : <Root.Screen name="location" component={EnableLocation} />
          }
          </>
        : (

          <Root.Screen name="auth" component={AuthNavigator} />
        )}
        </Root.Navigator>
      )
})

      const AuthStack = createStackNavigator();

export const AuthNavigator = () =>{
    return(
      <AuthStack.Navigator

        screenOptions={{
          cardStyle: {
            backgroundColor: COLORS.main
          },
          headerShown: false,

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
        tabBarOptions={{
          activeTintColor: COLORS.main,
          inactiveTintColor: COLORS.secondaryLight,
          activeBackgroundColor: COLORS.secondaryLight,
          inactiveBackgroundColor: COLORS.mainLight,
        }}
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Monsters') {
              iconName = "skull";
            } else if (route.name === 'Map') {
              iconName = "map";
            }
            else if (route.name === 'Hunt') {
              iconName = "star";
            }
            else if (route.name === 'Profile') {
              iconName = "person";
            }



            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          }
        })}
      >
        <TabStack.Screen name="Monsters" component={ListScreen} />
        <TabStack.Screen name="Map" component={MapScreen} />
        <TabStack.Screen name="Hunt" component={HuntScreen} />
        <TabStack.Screen name="Profile" component={ProfileScreen} />

      </TabStack.Navigator>
      );
}
