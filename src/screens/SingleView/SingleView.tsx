import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { monsterIMG } from '../../../public/images/monsters'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Tmonster } from '../../../globlalTypes'
import { FONTS, H1, H4, H5, H6 } from '../../lib/fonts'
import { COLORS } from '../../lib/colors'
import { Container, LAYOUT } from '../../lib/layout'
import { FavouriteButton, OutlineButton, SolidButton } from '../../components/atoms/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { observer } from 'mobx-react'
import appDataStore from '../../store/appDataStore'

const SingleView = observer(() => {

    const navigation = useNavigation()
    const { params } = useRoute()
    const huntStore = appDataStore

    const monster = params.monster as Tmonster
    React.useEffect(() => {
    }, [huntStore.huntList])

    const onCloseHandler = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }

    }
    return (
        <View>
            <Pressable onPress={onCloseHandler} style={styles.closeBtn} >
                <Icon name="close-circle" size={30} color={COLORS.secondaryLight} />
            </Pressable>

            <View style={styles.banner}>
                <Image source={monsterIMG[monster.name]} style={[styles.banner]} resizeMode={"stretch"} />
            </View>

            <View  >
                <View style={[styles.dataRow]}>
                    <View style={[LAYOUT.rowAlignCenterBetween, styles.body]}>
                        <H5 fontStyle={[FONTS.Bubble, { color: COLORS.secondaryLight }]} text={`Genis : `} />
                        <Text style={styles.dataText}>Mc {monster.name}</Text>
                    </View>
                </View>

                <View style={[styles.dataRow]}>
                    <View style={[LAYOUT.rowAlignCenterBetween, styles.body]}>
                        <H5 fontStyle={[FONTS.Bubble, { color: COLORS.secondaryLight }]} text={`Type : `} />
                        <Text style={styles.dataText}>{monster.type}</Text>
                    </View>
                </View>

                <View style={[styles.dataRow]}>
                    <View style={[LAYOUT.rowAlignCenterBetween, styles.body]}>
                        <H5 fontStyle={[FONTS.Bubble, { color: COLORS.secondaryLight }]} text={`Health Points : `} />
                        <Text style={styles.dataText}>{monster.hp}</Text>
                    </View>
                </View>

                <View style={[styles.dataRow]}>
                    <View style={[LAYOUT.rowAlignCenterBetween, styles.body]}>
                        <H5 fontStyle={[FONTS.Bubble, { color: COLORS.secondaryLight }]} text={`Power : `} />
                        <Text style={styles.dataText}>{monster.attack}</Text>
                    </View>
                </View>

                <View style={[styles.dataRow]}>
                    <View style={[LAYOUT.rowAlignCenterBetween, styles.body]}>
                        <H5 fontStyle={[FONTS.Bubble, { color: COLORS.secondaryLight }]} text={`Speed : `} />
                        <Text style={styles.dataText}>{monster.speed}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[LAYOUT.rowAlignCenterBetween, styles.body]}>
                        <H5 fontStyle={[FONTS.Bubble, { color: COLORS.secondaryLight }]} text={`Location : `} />
                    </View>
                    <View style={[LAYOUT.rowAlignCenterBetween, styles.body]}>

                        <Text style={styles.dataText}>{monster.address}</Text>
                    </View>
                </View>
            </View>


            <View style={[styles.body, styles.buttonContainer]}>

                {
                    !huntStore.hasMonster(monster.id) ?
                    <FavouriteButton monster={monster}>
                        <OutlineButton>
                            <H5 fontStyle={[, { color: COLORS.secondaryLight }]} text={`Add to Hunt List`} />
                        </OutlineButton>
                        </FavouriteButton>
                        : 
                    <FavouriteButton monster={monster}>
                        
                        <SolidButton>
                            <H5 fontStyle={[, { color: COLORS.main }]} text={`Remove from Hunt List`} />
                        </SolidButton>
                        </FavouriteButton>
                }

            </View>
        </View>
    )
})

export default SingleView

const styles = StyleSheet.create({
    closeBtn: {
        position: 'absolute',
        zIndex: 100,
        alignSelf: "flex-end",
        padding: 10,
    },
    banner: {
        width: "100%",
        height: 200,
    },

    body: {
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
    },
    dataText: {
        ...FONTS.Italic,
        color: "#fff",
        fontSize: 25,
        fontWeight: "300"
    },
    dataRow: {
        borderBottomColor: COLORS.mainLight,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },

})