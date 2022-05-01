import { StyleProp, ViewStyle } from "react-native"



const row : StyleProp<ViewStyle> = {
    flexDirection: 'row',
}

const rowAlignCenter : StyleProp<ViewStyle> = {
    ...row,
    alignItems: 'center',
}

const rowCenterBetween : StyleProp<ViewStyle> = {
    ...rowAlignCenter,
    justifyContent: 'space-between',
}

export const LAYOUT = {
    row,
    rowAlignCenter,
    rowCenterBetween,
}