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

const AddMemberForm = ({ setModalVisible }) => {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (value) => {
    if (value.length > 2) {
      setSearchName(value);
      // TODO: get actual results
      const mockResults = [
        {
          name: 'result1',
          uid: 1,
        },
        {
          name: 'result2',
          uid: 2,
        },
        {
          name: 'result1',
          uid: 3,
        },
        {
          name: 'result1',
          uid: 4,
        },
        {
          name: 'result1',
          uid: 5,
        },
        {
          name: 'result1',
          uid: 6,
        },
      ]
      setSearchResults(mockResults);
    } else {
      setSearchName(value);
      setSearchResults([]);
    }
  };

  const handleMemberAdd = async (uid) => {
    const memberToAdd = searchResults.find(r => r.uid === uid);
    console.log('member to add', memberToAdd);
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
