import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PlusIcon from '../PlusIcon';
import styles from './styles';
import MemberCard from '../MemberCard';

const ProjectMembers = () => {
  const mockMembers = [
    {
      uid: 1,
      name: 'test1',
      photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
      uid: 2,
      name: 'test2',
      photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
      uid: 3,
      name: 'test3',
      photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
      uid: 4,
      name: 'test3',
      photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
      uid: 5,
      name: 'test3',
      photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
      uid: 6,
      name: 'test3',
      photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
  ]
  const [members, setMembers] = useState(mockMembers);

  useEffect(() => {
    // TODO: get actual members
    console.log('setting members');
    setMembers(mockMembers);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {members.map(m =>
          <View style={styles.listItem}>
            <MemberCard member={m} key={m.uid} />
          </View>
        )}
      </ScrollView>
      <View>
        <TouchableOpacity onPress={() => console.log('add member')}
          style={styles.buttonContainer}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProjectMembers;
