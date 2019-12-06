import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

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
        <Text>
          {(name.length > 0) ? name[0] : "?"}
        </Text>
      </View>
  );
}

export default UserThumbnail;
