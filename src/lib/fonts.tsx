import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { useRem } from 'responsive-native'
import { COLORS } from './colors'

type fontProps = {
  text : string,
  fontStyle? : StyleProp<TextStyle>
  isButton? : boolean
}


interface TpresetFontProps extends fontProps {
  remSize : number,
}

const PresetFont : React.FC<TpresetFontProps> = ({text,fontStyle,remSize})  =>{
  const rem = useRem()
  return (
     <Text style={[{color : "#fff"},fontStyle,{fontSize : rem(remSize,true)}]}>{text}</Text>
  )
}




export const Header : React.FC<TpresetFontProps> = ({text,fontStyle,remSize}) =>{
  const rem = useRem()
  return (
    <PresetFont text={text} fontStyle={[{fontWeight : "500"},fontStyle]} remSize={remSize}/>
  )
}

export const H1 : React.FC<fontProps> = ({text,fontStyle}) =>{
  return (
    <Header text={text} fontStyle={fontStyle} remSize={2.5}/>
  )
}

export const H2 : React.FC<fontProps> = ({text,fontStyle}) =>{
  return (
    <Header text={text} fontStyle={fontStyle} remSize={2}/>
  )
}

export const H3 : React.FC<fontProps> = ({text,fontStyle}) =>{
  return (
    <Header text={text} fontStyle={fontStyle} remSize={1.75}/>
  )
}

export const H4 : React.FC<fontProps> = ({text,fontStyle}) =>{
  return (
    <Header text={text} fontStyle={fontStyle} remSize={1.5}/>
  )
}

export const H5 : React.FC<fontProps> = ({text,fontStyle}) =>{
  return (
    <Header text={text} fontStyle={fontStyle} remSize={1.25}/>
  )
}

export const H6 : React.FC<fontProps> = ({text,fontStyle}) =>{
  return (
    <Header text={text} fontStyle={fontStyle} remSize={1}/>
  )
}

const Bubble : StyleProp<TextStyle> = {
  fontWeight : "800"}

  const Italic : StyleProp<TextStyle> = {
    fontStyle : "italic"}
  export const FONTS = {
    Bubble,
    Italic
  }