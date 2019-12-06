import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import styles from './styles';
import userService from '../../services/userService';

const AddMemberForm = ({ setModalVisible }) => {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (value) => {
    try {
      if (value.length > 2) {
        setSearchName(value);
        const result = await userService.searchByName(value);
        setSearchResults(result);
      } else {
        setSearchName(value);
        setSearchResults([]);
      }
    } catch (e) {
      console.log('search failed');
    }
  };

  const handleMemberAdd = async (uid) => {
    const memberToAdd = searchResults.find(r => r.uid === uid);
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
