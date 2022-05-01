import Geolocation from "@react-native-community/geolocation";
import React from "react";
import { Platform } from "react-native";
import { Tlocation } from "../../globlalTypes";

type TgetOneTimeLocationParams = {
    setState: React.Dispatch<React.SetStateAction<Tlocation>>
    setError: React.Dispatch<React.SetStateAction<string>>
}

interface TsubscribeLocationLocation extends TgetOneTimeLocationParams {
    setWatchId: React.Dispatch<React.SetStateAction<number>>
}

export const getOneTimeLocation = async ({ setState, setError }: TgetOneTimeLocationParams) => {

    const location = {
        lat: 0,
        lng: 0
    }

    Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
            location.lng = parseFloat(JSON.stringify(position.coords.longitude));
            location.lat = parseFloat(JSON.stringify(position.coords.latitude));
            setState(location)
            setError("")
            return
        },
        (error) => {
            setError("Error getting location")
            return
        },
        {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
        },
    );
};

export const subscribeLocationLocation = async ({ setState, setError, setWatchId }: TsubscribeLocationLocation) => {
    const location = {
        lat: 0,
        lng: 0
    }

    setWatchId(Geolocation.watchPosition(
        (position) => {

            location.lng = parseFloat(JSON.stringify(position.coords.longitude));
            location.lat = parseFloat(JSON.stringify(position.coords.latitude));

        },
        (error) => {
            setError("Error getting location")
        },
        {
            enableHighAccuracy: false,
            maximumAge: 1000
        },
    )
    )
};

export const useLocation = () => {
    const [watchId, setWatchId] = React.useState<number>(-1)
    const [userLocation, setUserLocation] = React.useState<Tlocation>({
        lat: 0,
        lng: 0
    })
    const [error, setError] = React.useState<string>("")

    React.useEffect(() => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation({ setState: setUserLocation, setError: setError })
            subscribeLocationLocation({ setState: setUserLocation, setError: setError, setWatchId: setWatchId })
        }
        else {

        }
        return () => {
            Geolocation.clearWatch(watchId);
        };
        console.log("ERROR :", error)
    }, [])

    return {
        userLocation,
        error
    }
}
