import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS, H1, H5 } from '../../lib/fonts'
import { Container, LAYOUT } from '../../lib/layout'
import Logo from '../../components/atoms/Logo'
import { COLORS } from '../../lib/colors'

const LoginScreen = () => {
  return (
    <Container>
        <View style={LAYOUT.rowAllCenter}>
        <View>
            <Logo size='L'/>
            <H5 text='McMonsters' fontStyle={[FONTS.Bubble, styles.subTitle]}/>
        </View>
        </View>
       
        
        <View>
            <H1 text='Login' fontStyle={[FONTS.Bubble, styles.header ]}  />
        </View>

        <View style={LAYOUT.row}>
            
        </View>

    </Container>
  )
}


export default LoginScreen

const styles = StyleSheet.create({
    header : {color : COLORS.secondaryLight,letterSpacing : 1.5},
    subTitle : {
        color : COLORS.secondaryLight,letterSpacing : 1.5,
        textAlign : "center",
        marginTop : -40,
    },
})