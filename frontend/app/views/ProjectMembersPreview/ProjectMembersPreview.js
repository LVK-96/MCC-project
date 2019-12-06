import React from 'react';
import UserThumbnail from '../UserThumbnail';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

/*Placeholder image in data url format. TODO: Remove when actual images can be used*/
const uri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJklEQVQoU2NkaGD4z4AGGhga0IUYGIeEQob/GJ75z8CIxTODXyEAJqobfBeQVBoAAAAASUVORK5CYII=";
const image = { uri };

function ProjectMembersPreview() {
  //TODO: replace this placeholder, perhaps extract from context
  const members = [
    { name: "First" },
    { name: "Second", image },
    { name: "Third" },
    { name: "4th" },
  ];
  const limit = 3;
  const chosenOnes = members.slice(0, limit);
  return (
    <View style={styles.container}>
      {
        chosenOnes.map((member, index) => (
          <UserThumbnail
            key={`${member.name}:${index}`}
            name={member.name}
            image={member.image}
          />
        ))
      }
    </View>
  );
}

export default ProjectMembersPreview;
