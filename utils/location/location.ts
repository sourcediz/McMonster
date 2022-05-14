import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {Tlocation} from '../../globlalTypes';
import authStore from '../../src/store/userStore';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';
type TgetOneTimeLocationParams = {
  setState: React.Dispatch<React.SetStateAction<Tlocation>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

interface TsubscribeLocationLocation extends TgetOneTimeLocationParams {
  setWatchId: React.Dispatch<React.SetStateAction<number>>;
}

export const getOneTimeLocation = async ({
  setState,
  setError,
}: TgetOneTimeLocationParams) => {
  const location = {
    lat: 0,
    lng: 0,
  };

  const user = authStore;
  await Geolocation.getCurrentPosition(
    //Will give you the current location
    async position => {
      console.log(position);
      location.lng = parseFloat(JSON.stringify(position.coords.longitude));
      location.lat = parseFloat(JSON.stringify(position.coords.latitude));
      const permissionAlways = await Permissions.check(
        PERMISSIONS.IOS.LOCATION_ALWAYS,
      );
      const permissionInUse = await Permissions.check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      if (Platform.OS === 'android') {
        setState(location);
        user.locationEnabled();
      }
      if (permissionAlways === 'granted') {
        if (location !== {lat: 0, lng: 0}) {
          setState(location);
        }
        user.locationEnabled();
      } else if (permissionInUse === 'granted') {
        if (location !== {lat: 0, lng: 0}) {
          setState(location);
        }
        user.locationEnabledTemp();
      }
      setError('');
      return;
    },
    error => {
      setError('Error getting location');
      console.log(error);
      return;
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 1000,
    },
  );
};
export const subscribeLocationLocation = async ({
  setState,
  setError,
  setWatchId,
}: TsubscribeLocationLocation) => {
  const location = {
    lat: 0,
    lng: 0,
  };
  const user = authStore;
  setWatchId(
    await Geolocation.watchPosition(
      async position => {
        location.lng = parseFloat(JSON.stringify(position.coords.longitude));
        location.lat = parseFloat(JSON.stringify(position.coords.latitude));
        const permissionAlways = await Permissions.check(
          PERMISSIONS.IOS.LOCATION_ALWAYS,
        );

        const permissionInUse = await Permissions.check(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );

        if (permissionAlways === 'granted') {
          if (location !== {lat: 0, lng: 0}) {
            setState(location);
          }
          user.locationEnabled();
        } else if (permissionInUse === 'granted') {
          if (location !== {lat: 0, lng: 0}) {
            setState(location);
          }
          user.locationEnabledTemp();
        }
      },
      error => {
        setError('Error getting location');
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    ),
  );
};

export const useLocation = () => {
  // const [watchId, setWatchId] = React.useState<number>(-1);
  const [userLocation, setUserLocation] = React.useState<Tlocation>({
    lat: 0,
    lng: 0,
  });

  const [error, setError] = React.useState<string>('');

  useFocusEffect(
    React.useCallback(() => {
      const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          getOneTimeLocation({setState: setUserLocation, setError: setError});
          // subscribeLocationLocation({ setState: setUserLocation, setError: setError, setWatchId: setWatchId })
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
                buttonPositive: 'Allow',
                buttonNegative: 'Deny',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              getOneTimeLocation({
                setState: setUserLocation,
                setError: setError,
              });
              // subscribeLocationLocation({ setState: setUserLocation, setError: setError, setWatchId: setWatchId })
            } else {
              // setLocationStatus('Permission Denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };

      requestLocationPermission();

      return () => {
        // Geolocation.clearWatch(watchId);
      };
    }, []),
  );

  return [userLocation, error];
};
