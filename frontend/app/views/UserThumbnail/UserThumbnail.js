import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from './styles';

/*Component for displaying thumbnails of users.*/
function UserThumbnail({
  /*name used as fallback if image not available*/
  name,
  /*image in form of { uri: string }*/
  image,
}) {
  return (
    image
    ? <Image src={image} style={styles.image}/>
    : <View style={styles.fallback}>
        <Text style={styles.fallbackText}>
          {(name.length > 0) ? name[0] : "?"}
        </Text>
      </View>
  );
}

export default UserThumbnail;
