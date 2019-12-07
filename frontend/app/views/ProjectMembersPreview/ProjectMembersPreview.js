import React, { useEffect, useState } from 'react';
import UserThumbnail from '../UserThumbnail';
import {
  View,
} from 'react-native';
import userService from '../../services/userService';
import fetchCorrectRes from '../../util/fetchCorrectRes';
import styles from './styles';

/*A component that shows a preview of the members of a project.
  The images of up to three members are shown as thumbnails.*/
function ProjectMembersPreview({ members }) {
  const [membersWithPhotos, setMembersWithPhotos] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      let users = [];
      for (let m of members) {
        users.push(userService.getById(m));
      }

      users = await Promise.all(users);
      let correctUrls = users.map(u => fetchCorrectRes(u.photoURL));
      correctUrls = await Promise.all(correctUrls);
      for (let i = 0; i < correctUrls.length; ++i) {
        users[i].photoURL = correctUrls[i];
      }
      setMembersWithPhotos(users);
    }

    getUserInfo();
  }, [members]);

  const limit = 3;


  const chosenOnes = membersWithPhotos.slice(0, limit);
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
