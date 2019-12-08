import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import PlusIcon from '../PlusIcon';
import styles from './styles';
import MemberCard from '../MemberCard';
import AddMemberForm from '../AddMemberForm';
import MembersContext from '../../contexts/MembersContext';
import ProjectContext from '../../contexts/ProjectContext';
import AuthenticationContext from '../../contexts/AuthenticationContext';

/*The main body of the MembersList component (i.e. the actual content)*/
const ViewBody = ({ modalVisible, setModalVisible }) => {
  const membersContext = useContext(MembersContext);

  return (
    <View style={styles.container}>
      <Modal style={styles.container}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddMemberForm setModalVisible={setModalVisible} />
      </Modal>
      <View style={styles.container}>
        <ScrollView>
          {membersContext.members.map(m =>
            <View style={styles.listItem} key={m.uid}>
              <MemberCard member={m} />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

/*Shows a list of members of a project.*/
const MembersList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const authenticationContext = useContext(AuthenticationContext);
  const projectContext = useContext(ProjectContext);

  if (authenticationContext.user.uid === projectContext.selectedProject.owner) {
    return (
      <View style={styles.container}>
        <ViewBody modalVisible={modalVisible} setModalVisible={setModalVisible} />
        <TouchableOpacity onPress={() => setModalVisible(true) }
          style={styles.buttonContainer}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ViewBody modalVisible={modalVisible} setModalVisible={setModalVisible} />
  );
};

export default MembersList;
