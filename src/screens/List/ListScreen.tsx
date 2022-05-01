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
import { getOneTimeLocation, subscribeLocationLocation, useLocation } from '../../../utils/location/location'
import { COLORS } from '../../lib/colors'
import { OutlineButton } from '../../components/atoms/Button'

const ListScreen = () => {
    const [monsters, setMonsters] = React.useState([])

    // const [userLocation, setUserLoaction] = React.useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 })
    const [loading, setLoading] = React.useState(false)    
    const {error,userLocation} = useLocation()

    React.useEffect(() => {
        setLoading(true)

        if (userLocation.lng != 0) {
            getMacdonals(userLocation)
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
                    // setError("Error getting monsters")
                })
        }
        setLoading(false)
    }, [userLocation])

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
                                    keyExtractor={(item) => item.id}
                                />

                }


            </Container>
        </Wrapper>
    )
}



export default ListScreen

const styles = StyleSheet.create({})

