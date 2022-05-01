import { StyleProp, View, ViewStyle } from "react-native"

export const Container: React.FC = ({ children }) => {
    return <View style={containerStyle}>{children}</View>
}

const containerStyle: StyleProp<ViewStyle> = {
    flex: 1,
    width: "90%",
    alignSelf: "center",
}


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