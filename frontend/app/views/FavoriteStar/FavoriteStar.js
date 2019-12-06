import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

function FavoriteStar({
  isFavorite,
}) {
  const color = isFavorite ? 'blue' : 'black';
  return (
    <View style={styles.container}>
      <Icon
        name="star"
        size={22}
        color={color}
      />
    </View>
  );
}

export default FavoriteStar;
