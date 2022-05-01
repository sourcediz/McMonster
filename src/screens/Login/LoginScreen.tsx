import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS, H1 } from '../../lib/fonts'
import { Container, LAYOUT } from '../../lib/layout'
import Logo from '../../components/atoms/Logo'
import { COLORS } from '../../lib/colors'

const LoginScreen = () => {
  return (
    <Container>
        <View>
        <Logo size='L'/>
        </View>
        
        <View>
            <H1 text='Login' fontStyle={[FONTS.Bubble, {color : COLORS.secondaryLight,letterSpacing : 1.5}]}  />
        </View>
    </Container>
  )
}


export default LoginScreen

const styles = StyleSheet.create({})