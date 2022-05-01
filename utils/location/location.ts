import Geolocation from "@react-native-community/geolocation";
import { Tlocation } from "../../globlalTypes";

type TgetOneTimeLocationParams = {
    setState: React.Dispatch<React.SetStateAction<Tlocation>>
    setError: React.Dispatch<React.SetStateAction<string>>
}

export const getOneTimeLocation  = async ({setState,setError} : TgetOneTimeLocationParams) => {
    
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