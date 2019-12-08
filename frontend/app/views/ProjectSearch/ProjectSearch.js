import React, { useState, useContext } from 'react';
import {
  View,
  Picker,
  TextInput,
} from 'react-native';
import styles from './styles';
import ProjectContext from '../../contexts/ProjectContext';
import ProjectList from '../ProjectList';

/*Utility component used by ProjectSearch. Implements a search field.*/
function SearchField({ isTextInput, searchParam, setSearchParam }) {
  const projectContext = useContext(ProjectContext);

  if (isTextInput) {
    return (
      <TextInput style={styles.searchInput} value={searchParam} onChangeText={value => setSearchParam(value)}/>
    );
  } else {
    const keywords = [ ...new Set(projectContext.projects.map(p => p.keywords).flat()) ];
    return (
      <Picker style={styles.keywordPicker} mode="dropdown"
        selectedValue={searchParam}
        onValueChange={value => setSearchParam(value)}>
        {keywords.map(k =>
          <Picker.Item label={k} value={k} key={keywords.indexOf(k)} />
        )}
      </Picker>
    );
  }
}

/*A component for searching projects.*/
function ProjectSearch() {
  const [switchValue, setSwitchValue] = useState('name');
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchParam, setSearchParam] = useState('');

  function handleSwitch(value) {
    setSwitchValue(value);
    switch (value) {
      case 'keyword_list':
        setSearchCriteria('keyword');
        break;

      case 'keyword':
        setSearchCriteria('keyword');
        break;

      case 'name':
        setSearchCriteria('name');
        break;

      default:
        setSearchCriteria('name');
    }
  }

  return (
    <View style={styles.container} >
      <View style={styles.pickerContainer}>
        <Picker style={styles.searchPicker}
          selectedValue={switchValue}
          onValueChange={value => handleSwitch(value)}>
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Keyword" value="keyword" />
          <Picker.Item label="Keyword list" value="keyword_list" />
        </Picker>
      </View>
      <View style={styles.searchContainer}>
        <SearchField isTextInput={switchValue !== 'keyword_list'} searchParam={searchParam} setSearchParam={setSearchParam} />
      </View>
      <View style={styles.projectContainer}>
        <ProjectList filter={searchCriteria} searchParam={searchParam} />
      </View>
    </View>
  );
}

export default ProjectSearch;
