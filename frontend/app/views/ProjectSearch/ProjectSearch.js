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
  const [searchCriteria, setSearchCriteria] = useState('Name');
  const [searchParam, setSearchParam] = useState('');

  const toggleSwitch = () => {
    setSwitchValue(!switchValue);
    if (!switchValue) {
      setSearchCriteria('Keyword');
    } else {
      setSearchCriteria('Name');
    }
  };

  return (
    <View style={styles.container} >
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} value={searchParam} onChangeText={value => setSearchParam(value)}/>
        <View style={styles.toggleContainer}>
          <Switch style={styles.searchToggle} value={switchValue} onValueChange={toggleSwitch} />
          <Text>{searchCriteria}</Text>
        </View>
      </View>
      <View style={styles.projectContainer}>
        <ProjectList filter="name" searchName={searchParam} />
      </View>
    </View>
  );
}

export default ProjectSearch;
