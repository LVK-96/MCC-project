import React, { useContext } from 'react';
import UserThumbnail from '../UserThumbnail';
import {
  View,
} from 'react-native';
import MembersContext from '../../contexts/MembersContext';
import styles from './styles';

/*A component that shows a preview of the members of a project.
  The images of up to three members are shown as thumbnails.*/
function ProjectMembersPreview() {
  const membersContext = useContext(MembersContext);
  const limit = 3;
  const chosenOnes = membersContext.members.slice(0, limit);
  return (
    <View style={styles.container}>
      {
        chosenOnes.map((member, index) => (
          <UserThumbnail
            key={`${member.name}:${index}`}
            name={member.name}
            image={{ uri: member.photoURL }}
          />
        ))
      }
    </View>
  );
}

export default ProjectMembersPreview;
