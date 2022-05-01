import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getMacdonals } from '../../../utils/places'
import Geolocation from '@react-native-community/geolocation'
import { generateMonster } from '../../../utils/monsters/monsterGenerator'
import { Container, Wrapper } from '../../lib/layout'
import { FlatList } from 'react-native-gesture-handler'
import MonsterCard from '../../components/atoms/MonsterCard/MonsterCard'
import { FONTS, H1, H2 } from '../../lib/fonts'
import { observer } from 'mobx-react'

const ListScreen = () => {
    const [places, setPlaces] = React.useState([])
    const [userLoaction, setUserLoaction] = React.useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 })
    //Get Geo Loacation
    React.useEffect(() => {
        console.log(userLoaction)

        if (Platform.OS === 'ios') {
            getOneTimeLocation(setUserLoaction);
        } else {

        }

    }, [])

    React.useEffect(() => {
        if (userLoaction.lng != 0) {
            getMacdonals(userLoaction)
                .then((r) => {
                    const monsters = r.map((place) => {
                        return generateMonster(place.place_id, place.rating)
                    })

                    setPlaces(monsters)
                })
    }
    }, [userLoaction])

    return (
        <Wrapper>
            <Container>
            <H2 fontStyle={[FONTS.Bubble,{paddingVertical : 30}]} text={`Monsters Near You `}/>

            <FlatList
                data={places}
                renderItem={({ item }) => <View style={{paddingBottom : 20}}><MonsterCard monster={item}/></View>}
                keyExtractor={(item) => item.name}
            />
          
            </Container>
        </Wrapper>
    )
}



export default ListScreen

const styles = StyleSheet.create({})




export const getOneTimeLocation = async (setState: React.Dispatch<React.SetStateAction<{
    lat: number;
    lng: number;
}>>) => {
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
        },
        (error) => {
            //   setLocationStatus(error.message);
            // return error.message
        },
        {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
        },
    );
};

// if (Platform.OS === 'ios') {
//     return getOneTimeLocation(setGeoLoaction);
// } else {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Access Required',
//         message: 'This App needs to Access your location',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       //To Check, If Permission is granted
//       getOneTimeLocation();
//     } else {
//     //   setLocationStatus('Permission Denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }