import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Container, LAYOUT, Wrapper } from '../../lib/layout'
import { FONTS, H1, H2, H3, H5 } from '../../lib/fonts'
import { COLORS } from '../../lib/colors'
import Icon  from 'react-native-vector-icons/Ionicons'

const ProfileScreen = () => {
  return (
    <Wrapper >
        <View style={{height : "50%"}}>
        <Container  justifyContent='flex-start'>
            <View style={{marginTop : 20}}>
            <H1 fontStyle={[FONTS.Bubble, {color : COLORS.secondaryLight}]} text='WELCOME HUNTER'/>
            </View>
            
        </Container>
        <View style={styles.splitter}></View>
        <View style={[ styles.dataRow]}>

             <View style={[LAYOUT.rowAlignCenterBetween,styles.body]}>
                <H5 fontStyle={[FONTS.Bubble, {color : COLORS.secondaryLight}]} text={`Logout `} />
                <Icon name='chevron-forward-outline' size={30} color={COLORS.secondaryLight} />
                </View>
            </View>
         </View>
    </Wrapper>
  )
}

export default ProfileScreen


const styles = StyleSheet.create({
   splitter : {
       height: Dimensions.get('window').height * 0.03,
       width : "100%",
       backgroundColor : COLORS.mainLight + "33",
   },
    dataText : {
        ...FONTS.Italic,
        color : "#fff",
        fontSize : 25,
        fontWeight : "300"
    },

    body : {
        width: "90%",
        alignSelf : "center",
        marginTop : 10,
    },
    dataRow : {
        borderBottomColor : COLORS.mainLight,
        borderBottomWidth : 1,
        paddingBottom : 10,
    },
    
})