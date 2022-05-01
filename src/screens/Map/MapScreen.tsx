import { Platform, StyleSheet, Text, View, Animated, Dimensions, Pressable } from 'react-native'
import React, { useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Wrapper } from '../../lib/layout'
import { MAP_STYLE } from '../../lib/map'
import { ICONS } from '../../../public/images/icon'
import { Tlocation, Tmonster } from '../../../globlalTypes'
import { generateMonster } from '../../../utils/monsters/monsterGenerator'
import MonsterCard from '../../components/atoms/MonsterCard/MonsterCard'
import { getOneTimeLocation, useLocation } from '../../../utils/location/location'
import PopIn from '../../components/atoms/PopIn'
import { getMacdonals } from '../../../utils/places'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../lib/colors'
import Icon  from 'react-native-vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native'




const MapScreen = () => {
  const [userLocation] = useLocation()

  const [mapLocation,setMapLocation] = React.useState<Tlocation>({ lat: 0, lng: 0 })
  const [searchLocation,setSearchLocation] = React.useState<Tlocation>({ lat: 0, lng: 0 })
  const [mapLoaded,setMapLoaded] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [monsters, setMonsters] = React.useState<Tmonster[]>([])


  const [showCard, setShowCard] = React.useState(false)
  const [monsterId, setMonsterId] = React.useState('')
  const [selectedMonster, setSelectedMonster] = React.useState<Tmonster | null>(null)

  const {params} = useRoute()

  
  const onMarkerPress = (monster: Tmonster) => {
    setMonsterId(monster.id)
    //first time selecting a monster
    if (!selectedMonster) {
      setSelectedMonster(monster)
      setShowCard(true)
    }
    //any other time
    else {
      setShowCard(false)
      setTimeout(() => {
        setSelectedMonster(monster)
        setShowCard(true)
      }, 500)
    }
  }

  const onRelocate = ()=>{
    setMapLocation(userLocation)
  }



  

  //Handle Locate from another screen
  React.useEffect(()=>{
    if(mapLoaded){
      if(params?.monster ){
        console.log("setting cords",params.monster.location)
        setMapLocation(params.monster.location)
        setMonsterId(params.monster.id)
        onMarkerPress(params.monster)
      }
      else{
        getOneTimeLocation({ setState: setMapLocation, setError: setError })
      }
  }
  },[mapLoaded,params])

 

  
React.useEffect(() => {

  console.log("Refresh", userLocation);
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
  }
}, [userLocation])

React.useEffect(() => {
  console.log("Map User Location",userLocation)
  if (searchLocation.lng != 0) {

    getMacdonals(searchLocation)
      .then((r) => {
        const monsters = r.map((place) => {
          const monster = generateMonster(place.place_id, place.rating)
          monster.location = place.geometry.location
          monster.address = place.vicinity
          return monster
        })

        setMonsters(monsters)
      })
  }
}, [searchLocation])

return (
  <View style={styles.container}>
 
    
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: mapLocation.lat,
        longitude: mapLocation.lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        
      }}
      customMapStyle={MAP_STYLE}
      onMapReady={()=>{setMapLoaded(true)}}
    >
     
 
      <Marker
        coordinate={{
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        }}
        title="You are here"
        image={ICONS.sword.icon}
      />
      {
        monsters && monsters.map((monster, index) => (
          <Marker
            key={monster.id}
            icon={monster.id == monsterId ? ICONS.monster.icon : ICONS.monster.marker}
            coordinate={{ latitude: monster.location.lat, longitude: monster.location.lng }}
            onPress={() => { onMarkerPress(monster) }}
          />

        ))
      }

    </MapView>

  

    <Pressable onPress={onRelocate} style={[styles.mapButton]}>
      <Icon name='locate-outline' color={COLORS.main} size={25}/>
    </Pressable>
    {
      selectedMonster && (
        <PopIn showCard={showCard} >
          <MonsterCard setMapLocation={setMapLocation} monster={selectedMonster} />
        </PopIn>
      )
    }

  </View>
)
} 

export default MapScreen

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapButton : {
    borderRadius : 8,
    height : 50,
    width : 50,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : COLORS.secondaryLight,
    position : 'absolute',
    top: '10%',
    alignSelf : "flex-end",
    margin: 20,
    zIndex : 10,
    }
});