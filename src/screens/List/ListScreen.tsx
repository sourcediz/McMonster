import { Linking, PermissionsAndroid, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Geolocation from '@react-native-community/geolocation'
import { generateMonster } from '../../../utils/monsters/monsterGenerator'
import { Container, Wrapper } from '../../lib/layout'
import { FlatList } from 'react-native-gesture-handler'
import MonsterCard from '../../components/atoms/MonsterCard/MonsterCard'
import { FONTS, H1, H2, H3, H5 } from '../../lib/fonts'
import { observer } from 'mobx-react'
import { getMacdonals } from '../../../utils/places'
import { getOneTimeLocation } from '../../../utils/location/location'
import { COLORS } from '../../lib/colors'
import { OutlineButton } from '../../components/atoms/Button'

const ListScreen = () => {
    const [monsters, setMonsters] = React.useState([])

    const [userLoaction, setUserLoaction] = React.useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 })
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    //Get/Ask Geo Loacation
    React.useEffect(() => {
        setLoading(true)
        if (Platform.OS === 'ios') {
            getOneTimeLocation({ setState: setUserLoaction, setError: setError })
                .then(() => {
                    getOneTimeLocation({ setState: setUserLoaction, setError: setError })
                    setLoading(false)
                })
        }
        else {

        }
        console.log("ERROR :", error)
    }, [])


    React.useEffect(() => {
        setLoading(true)

        if (userLoaction.lng != 0) {
            getMacdonals(userLoaction)
                .then((r) => {
                    const monsters = r.map((place) => {
                        const monster = generateMonster(place.place_id, place.rating)
                        monster.location = place.geometry.location
                        monster.address = place.vicinity
                        return monster
                    })
                    setMonsters(monsters)
                })
                .catch((e) => {
                    setError("Error getting monsters")
                })
        }
        setLoading(false)
    }, [userLoaction])

    return (
        <Wrapper>
            <Container>
                <H2 fontStyle={[FONTS.Bubble, { paddingVertical: 30 }]} text={`Monsters Near You `} />

                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
                            <H1 fontStyle={{ color: COLORS.secondaryLight, }} text='Loading...' />
                        </View>
                        :

                        error.length != 0 ?

                            <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
                                <H3 fontStyle={{ color: "red", textAlign: "center" }} text={error} />
                                <TouchableOpacity onPress={() => { Linking.openURL('app-settings:passwords'); }} style={{ marginTop: 10 }}>
                                    <OutlineButton>
                                        <H5 fontStyle={{ color: COLORS.secondaryLight, textAlign: "center" }} text={"Enable Location Services"} />
                                    </OutlineButton>
                                </TouchableOpacity>
                            </View>
                            :
                            monsters.length == 0 ?
                                <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
                                    <H5 fontStyle={{ color: COLORS.secondaryLight, textAlign: "center" }} text={"No Mc Monster Near you"} />
                                </View>
                                :
                                <FlatList
                                    data={monsters}
                                    renderItem={({ item }) => <View style={{ paddingBottom: 20 }}><MonsterCard monster={item} /></View>}
                                    keyExtractor={(item) => item.name}
                                />

                }


            </Container>
        </Wrapper>
    )
}



export default ListScreen

const styles = StyleSheet.create({})




// export const getOneTimeLocation = async (setState: React.Dispatch<React.SetStateAction<{
//     lat: number;
//     lng: number;
// }>>) => {
//     const location = {
//         lat: 0,
//         lng: 0
//     }

//     Geolocation.getCurrentPosition(
//         //Will give you the current location
//         (position) => {
//             location.lng = parseFloat(JSON.stringify(position.coords.longitude));
//             location.lat = parseFloat(JSON.stringify(position.coords.latitude));
//             setState(location)
//         },
//         (error) => {
//             //   setLocationStatus(error.message);
//             // return error.message
//         },
//         {
//             enableHighAccuracy: false,
//             timeout: 30000,
//             maximumAge: 1000
//         },
//     );
// };

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