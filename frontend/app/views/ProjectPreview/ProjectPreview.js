import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ContextMenu from '../ContextMenu';
import FavoriteStar from '../FavoriteStar';
import ProjectMembersPreview from '../ProjectMembersPreview';
import AuthenticationContext from '../../contexts/AuthenticationContext';

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
  isOwner,
  id,
  members,
  deleteProject,
}) {
  const [favorite, setFavorite] = useState(false);

  const authenticationContext = useContext(AuthenticationContext);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (authenticationContext.user.favorites.includes(id)) setFavorite(true);
      else setFavorite(false);
    }

    checkFavoriteStatus();
  }, []);

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
        <ProjectMembersPreview members={members} />
      </View>
      <View style={styles.menuContainer}>
        <FavoriteStar
          isFavorite={favorite}
          setFavorite={setFavorite}
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
