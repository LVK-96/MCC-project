import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from './styles';

const MemberCard = ({ member }) => {
  return (
    <View>
      <Text>{member.name}</Text>
      <Image source={{ uri: member.photoURL }} style={styles.image} />
    </View>
  );
}

export default MemberCard;
