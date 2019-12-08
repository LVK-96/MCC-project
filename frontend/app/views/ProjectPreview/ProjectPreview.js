import React, { useState } from 'react';
import storage from '@react-native-firebase/storage';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import ContextMenu from '../ContextMenu';
import FavoriteStar from '../FavoriteStar';
import ProjectMembersPreview from '../ProjectMembersPreview';
import reportService from '../../services/reportService';
import projectService from '../../services/projectService';

/*Offers a preview of a project in a project list. Contains only essential
  information, as the goal is to keep the preview small enough to be usable
  within a list of projects.*/
function ProjectPreview({
  name,
  description,
  deadline,
  modified,
  created,
  onPress,
  isFavorite,
  isOwner,
  id,
  members,
  type,
  deleteProject,
}) {

  const hasMembers = members && (members.length > 0);

  const generateReport = async () => {
    try {
      await reportService.generate({ id: id, name: name, deadline: deadline, description: description });
      const reportRef = storage().ref().child(`${name}-${id}.pdf`);
      await projectService.createFileFromRef(id, reportRef);
      Alert.alert('Report saved to');
    } catch (e) {
      console.log(e);
      Alert.alert('report generation failed');
    }
  };

  console.log(isFavorite);
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
        {hasMembers && <ProjectMembersPreview members={members} />}
      </View>
      <View style={styles.menuContainer}>
        <FavoriteStar
          isFavorite={isFavorite}
          projectId={id}
        />
        <ContextMenu options={[
          /*Only show options that are relevant to the user. Only show
            deletion option if user is the owner. Only show report option if
            project is a group project.*/
          ...(isOwner ? [{ text: "Delete", onSelect: () => deleteProject(id)}] : []),
          { text: "Show project content", onSelect: () => console.warn("TODO: Show")},
          { text: "Generate project report", onSelect: () => generateReport() },
        ]}/>
      </View>
    </TouchableOpacity>
  );
}

export default ProjectPreview;
