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

const EnableLocation = () => {
    const [monsters, setMonsters] = React.useState([])

    // const [userLocation, setUserLoaction] = React.useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 })
    const [loading, setLoading] = React.useState(false)    
    const {error,userLocation} = useLocation()
    const [refresh,setRefresh] = React.useState(false);

    React.useEffect(() => {
       
    }, [userLocation,refresh])

    return (
        <Wrapper>
            <Container>
                <H2 fontStyle={[FONTS.Bubble, { paddingVertical: 30 }]} text={`Enable Location`} />

       
                            <View style={{ flex: 1}}>
                                <TouchableOpacity onPress={() => { Linking.openSettings(); }} style={{ marginTop: 10 }}>
                                    <OutlineButton>
                                        <H5 fontStyle={{ color: COLORS.secondaryLight, textAlign: "center" }} text={"Enable Location Services"} />
                                    </OutlineButton>
                                </TouchableOpacity>

                                <H5 fontStyle={{ color: "#fff", textAlign: "center", marginTop :10 }} text={"Close App and Try again"} />

                            </View>
                           

                


            </Container>
        </Wrapper>
    )
}



export default EnableLocation

const styles = StyleSheet.create({})

