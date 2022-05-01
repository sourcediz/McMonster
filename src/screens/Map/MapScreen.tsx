import { Platform, StyleSheet, Text, View ,Animated} from 'react-native'
import React, { useRef } from 'react'
import MapView, {  Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Wrapper } from '../../lib/layout'
import { MAP_STYLE } from '../../lib/map'
import { ICONS } from '../../../public/images/icon'
import { Tmonster } from '../../../globlalTypes'
import { getOneTimeLocation } from '../List/ListScreen'
import { getMacdonals } from '../../../utils/places'
import { generateMonster } from '../../../utils/monsters/monsterGenerator'
import MonsterCard from '../../components/atoms/MonsterCard/MonsterCard'



const MapScreen = () => {

  const [showCard,setShowCard] = React.useState(false)
  const [monsterId,setMonsterId] = React.useState('')
  const [selectedMonster,setSelectedMonster] = React.useState<Tmonster | null>(null)

  const onMarkerPress =(monster : Tmonster)=>{
    setMonsterId(monster.id)
    //first time selecting a monster
    if(!selectedMonster){
      setSelectedMonster(monster)
      setShowCard(true)
    }
    //any other time
    else{
      setShowCard(false)
      setTimeout(()=>{
        setSelectedMonster(monster)
        setShowCard(true)
      },500)
    }
  }

  const popIn = useRef(new Animated.Value(200)).current  
  const popInAnim = Animated.timing(
    popIn,
    {
      toValue: -50,
      duration: 500,
      useNativeDriver: true,
    }
  )

  const popOutAnim = Animated.timing(
    popIn,
    {
      toValue: 200,
      duration: 500,
      useNativeDriver: true,
    }
  )

  React.useEffect(() => {
    
    if(showCard){
      popInAnim.start()
    }
    else{
      popOutAnim.start()
    }
  }, [popIn,showCard])

  const [places, setPlaces] = React.useState<Tmonster[]>([])
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
                      const monster = generateMonster(place.place_id, place.rating)
                      monster.location = place.geometry.location
                      monster.address = place.vicinity
                      return monster
                  })

                  setPlaces(monsters)
              })
  }
  }, [userLoaction])

  return (
    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.785834,
         longitude: -122.406417,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
       customMapStyle={MAP_STYLE}
     >

       {
         places && places.map((monster,index)=>(
          <Marker
          key={monster.id}
          icon={monster.id == monsterId ? ICONS.monster.icon :  ICONS.monster.marker}
          coordinate={{latitude : monster.location.lat, longitude : monster.location.lng}}
          // title={"test"}
          // description={"test test "}
          onPress={()=>{onMarkerPress(monster)}}
        />
        
         ))
       }
      
     </MapView>

    {
      selectedMonster  && (
        // animated view

        <Animated.View
          style={{
            transform: [{ translateY: popIn }],
          }}
        >
       <MonsterCard monster={selectedMonster}/>
     </Animated.View>)
    }
     
   </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex : 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });