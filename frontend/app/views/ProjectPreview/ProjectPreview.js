import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ContextMenu from '../ContextMenu';
import FavoriteStar from '../FavoriteStar';

/*Offers a preview of a project in a project list. Contains only essential
  information, as the goal is to keep the preview small enough to be usable
  within a list of projects.*/
function ProjectPreview({
  name,
  description,
  deadline,
  modified,
  created,
  favorite,
  onPress,
  setFavorite,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
        <Text style={styles.deadline}>
          {(new Date(deadline)).toString()}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <FavoriteStar
          isFavorite={favorite}
          setFavorite={setFavorite}
        />
        <ContextMenu options={[
          { text: "Delete", onSelect: () => console.warn("TODO: Delete")},
          { text: "Show project content", onSelect: () => console.warn("TODO: Show")},
          { text: "Generate project report", onSelect: () => console.warn("TODO: Report")},
        ]}/>
      </View>
    </TouchableOpacity>
  );
}

export default ProjectPreview;
