import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import MembersContext from '../../contexts/MembersContext';
import ProjectContext from '../../contexts/ProjectContext';
import userService from '../../services/userService';
import styles from './styles';

const AddMemberForm = ({ setModalVisible }) => {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const authenticationContext = useContext(AuthenticationContext);
  const projectContext = useContext(ProjectContext);
  const membersContext = useContext(MembersContext);

  const handleSearch = async (value) => {
    try {
      if (value.length > 2) {
        setSearchName(value);
        const result = await userService.searchByName(value, authenticationContext.user.uid);
        const oldMembersUid = membersContext.members.map(m => m.uid);
        let filteredResult = result.filter(m => !oldMembersUid.includes(m.uid))
                                   .filter(m => m.uid !== projectContext.selectedProject.owner)
        setSearchResults(filteredResult);
      } else {
        setSearchName(value);
        setSearchResults([]);
      }
    } catch (e) {
      console.log('search failed');
    }
  };

  const handleMemberAdd = async (uid) => {
    try {
      const memberToAdd = searchResults.find(r => r.uid === uid);
      await membersContext.addMember(memberToAdd);
      await projectContext.addMemberToProject(memberToAdd, projectContext.selectedProject.id);
    } catch (e) {
      console.log(e);
      Alert.alert('Adding member failed!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} value={searchName}
          onChangeText={(value) => handleSearch(value)} />
      </View>
      <ScrollView style={styles.containerItem}>
        {searchResults.map(r =>
        <TouchableOpacity key={r.uid} onPress={() => handleMemberAdd(r.uid)} style={styles.containerItem}>
            <Text>{r.name}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.containerItem}>
        <Button title="Go back" onPress={() => setModalVisible(false)} style={styles.backButton} color={'grey'} />
      </View>
    </View>
  );
}

export default AddMemberForm;
