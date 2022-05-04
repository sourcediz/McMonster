import {StyleSheet, Text, View, Animated} from 'react-native';
import React from 'react';

type ShowCardProps = {
  showCard: boolean;
};

const PopIn: React.FC<ShowCardProps> = ({children, showCard}) => {
  const popIn = React.useRef(new Animated.Value(200)).current;
  const popInAnim = Animated.timing(popIn, {
    toValue: -50,
    duration: 500,
    useNativeDriver: true,
  });

  const popOutAnim = Animated.timing(popIn, {
    toValue: 200,
    duration: 500,
    useNativeDriver: true,
  });

  React.useEffect(() => {
    if (showCard) {
      popInAnim.start();
    } else {
      popOutAnim.start();
    }
  }, [popIn, showCard]);

  return (
    <Animated.View
      style={{
        transform: [{translateY: popIn}],
      }}>
      {children}
    </Animated.View>
  );
};

export default PopIn;

const styles = StyleSheet.create({});
