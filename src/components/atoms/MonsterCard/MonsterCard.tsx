import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tmonster } from '../../../../globlalTypes'
import { COLORS } from '../../../lib/colors'
import { LAYOUT } from '../../../lib/layout'
import { monsterIMG } from '../../../../public/images/monsters'
import { FONTS, H1, H4, H6 } from '../../../lib/fonts'
import Icon from 'react-native-vector-icons/Ionicons';
import { convertThousands } from '../../../../utils/monsters/units'

type TmonsterCardProps = {
    monster: Tmonster
}


const MonsterCard: React.FC<TmonsterCardProps> = ({ monster }) => {
    return (
        <View style={styles.card}>
            <View style={[LAYOUT.rowAlignCenterBetween]}>

                <View>
                    <Image source={monsterIMG[monster.name]} style={[styles.thumbnail]} resizeMode={"cover"} />
                </View>

                <View style={{ width: "70%" }}>
                    <View style={[LAYOUT.rowAlignCenterBetween]}>
                        <H6 fontStyle={[FONTS.Bubble]} text={`Mc ${monster.type} ${monster.name}`} />
                        <Icon name='star-outline' size={25} color={COLORS.secondaryLight} />
                    </View>
                    
                    <View style={[LAYOUT.rowAlignCenter]}>
                        
                        <View style={[LAYOUT.rowAlignCenter,styles.statContainer]}>
                            <Icon name='aperture' size={25} color={COLORS.secondaryLight} />
                            <H6 fontStyle={[FONTS.Bubble]} text={`${monster.attack}`} />
                        </View>
                        <View style={[LAYOUT.rowAlignCenter,styles.statContainer]}>
                            <Icon name='speedometer' size={25} color={COLORS.secondaryLight} />
                            <H6 fontStyle={[FONTS.Bubble]} text={`${monster.speed}`} />
                        </View>
                    </View>
                    <View style={[LAYOUT.rowAlignCenter,styles.statContainer]}>
                            <Icon name='heart' size={25} color={COLORS.secondaryLight} />
                            <H6 fontStyle={[FONTS.Bubble]} text={`${convertThousands(monster.hp)} / ${convertThousands(monster.hp)} `} />
                        </View>

                </View>
            </View>
        </View>
    )
}

export default MonsterCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: COLORS.mainLight,
        padding: 10
    },
    thumbnail: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.3,
        borderRadius: 8
    },
    statContainer: {
        paddingRight: 10
    }

})