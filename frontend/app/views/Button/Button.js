import React from 'react';
import {
  View,
  Button as RNButton,
} from 'react-native';

function Button({
  style,
  ...rest
}) {
  return (
    <View style={style}>
      <RNButton {...rest}/>
    </View>
  );
}

export default Button;
