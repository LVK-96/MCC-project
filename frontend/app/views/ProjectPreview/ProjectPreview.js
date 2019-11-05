import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

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
}) {
  return (
    <View style={styles.container}>
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
  );
}

export default ProjectPreview;
