import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ContextMenu from '../ContextMenu';
import FavoriteStar from '../FavoriteStar';
import ProjectMembersPreview from '../ProjectMembersPreview';

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
  deleteProject,
}) {
  //const [favorite, setFavorite] = useState(isFavorite);

  const hasMembers = members && (members.length > 0);

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
          { text: "Delete", onSelect: () => deleteProject(id)},
          { text: "Show project content", onSelect: () => console.warn("TODO: Show")},
          { text: "Generate project report", onSelect: () => console.warn("TODO: Report")},
        ].filter(opt => opt.text === 'Delete' ? isOwner : true)}/>
      </View>
    </TouchableOpacity>
  );
}

export default ProjectPreview;
