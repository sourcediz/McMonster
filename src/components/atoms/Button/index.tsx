import { StyleProp, StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import { LAYOUT } from '../../../lib/layout'
import { COLORS } from '../../../lib/colors'

type TbuttonBaseProps = {
    buttonStyle : StyleProp<ViewProps>
}


const ButtonBase : React.FC<TbuttonBaseProps> = (props) => {
  return (
    <View style={[styles.button,LAYOUT.rowAllCenter, props.buttonStyle]}>
      {props.children}
    </View>
  )
}

export const OutlineButton : React.FC = (props) => {
    
    return(
        <ButtonBase buttonStyle={[LAYOUT.rowAllCenter, styles.outlineButton]}>
            {props.children}
        </ButtonBase>
    )
}


export default ButtonBase

const styles = StyleSheet.create({
    button : {
        borderRadius : 8,
        paddingVertical : 15,
    },
    outlineButton : {
        borderWidth : 2,
        borderColor : COLORS.secondaryLight,
    }
})