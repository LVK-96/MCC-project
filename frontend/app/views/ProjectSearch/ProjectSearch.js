import React, { useState } from 'react';
import {
  View,
  Switch,
  Text,
  TextInput,
} from 'react-native';
import styles from './styles';
import ProjectList from '../ProjectList';

function ProjectSearch() {
  const [switchValue, setSwitchValue] = useState(false);
  const [searchParam, setSearchParam] = useState('Name');

  const toggleSwitch = () => {
    setSwitchValue(!switchValue);
    if (!switchValue) {
      setSearchParam('Keyword');
    } else {
      setSearchParam('Name');
    }
  };

  return (
    <View style={styles.container} >
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} />
        <View style={styles.toggleContainer}>
          <Switch style={styles.searchToggle} value={switchValue} onValueChange={toggleSwitch} />
          <Text>{searchParam}</Text>
        </View>
      </View>
      <ProjectList />
    </View>
  );
}

export default ProjectSearch;
