import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import AuthenticationContext from '../../contexts/AuthenticationContext';

/*A component that shows and allows the user to select whether or not some item
  is favorited.*/
function FavoriteStar({
  projectId,
  isFavorite,
  /*A function that sets the desired object as favorite.
    No loading logic needed, this component handles it on its own.*/
}) {
  const authenticationContext = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  /*User input to the component is only relevant if the setFavorite function
    has been provided.*/
  const toggle = () => setLoading(prev => !prev);
  /*Whenever the loading flag has been set to true, set the favorite status
    as the opposite of what it currently is.*/
  useEffect(() => {
    if (loading) {
      (async () => {
        try {
          await authenticationContext.updateFavorites(projectId, isFavorite);
        } catch (e) {
          Alert.alert(
            "Favorite-operation failed",
            "The attempt to include a project in your favorites has failed.",
            [
              {text: "OK", onPress: () => {}}
            ],
          );
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [loading]);
  const color = isFavorite ? 'blue' : 'black';
  const size = 22;
  return (
    <View style={styles.container}>
      {
        loading
        ? <ActivityIndicator size={size}/>
        : <Icon
            name="star"
            size={size}
            color={color}
            onPress={toggle}
          />
      }
    </View>
  );
}

export default FavoriteStar;
