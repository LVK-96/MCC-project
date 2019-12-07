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

const MembersList = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true) }
            style={styles.buttonContainer}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MembersList;
