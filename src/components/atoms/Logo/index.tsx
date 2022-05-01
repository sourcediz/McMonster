import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { LAYOUT } from '../../../lib/layout'
import { COLORS } from '../../../lib/colors'
import { useRem } from 'responsive-native'
type TlogoSize = "S" | "M" | "L" | number

type LogoProps = {
  size: TlogoSize
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  const rem = useRem()
  return (
    <View style={[LAYOUT.rowAllCenter]}>
      <Text style={[styles.logoCharStyles,
      {
        letterSpacing: rem(logoSize(size) / -2, true),
        fontSize: rem(logoSize(size))
      }]}>MM</Text>


    </View>
  )
}

export default Logo

const logoSize = (size: TlogoSize): number => {
  return size === "S" ? 3 : size === "M" ? 6 : size === "L" ? 12 : size
}

const styles = StyleSheet.create({
  logoCharStyles: {
    fontWeight: 'bold',
    color: COLORS.secondary,
      textShadowOffset: {
        width: 5,
        height: 0
      },
      textShadowColor: COLORS.mainLight,
      textShadowRadius: 1
  },
})