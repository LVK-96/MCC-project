import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ProjectContext from '../../contexts/ProjectContext';
import PlusIcon from '../PlusIcon';
import colors from '../../values/colors';
import projectService from '../../services/projectService';
import styles from './styles';

function ProjectFiles() {
  const { selectedProject } = useContext(ProjectContext);
  const [files, setFiles] = useState([]);

  // Re-fetch the files when the selected project changes.
  useEffect(() => {

    async function fetchFiles(id) {
      const fetched = await projectService.getFilesByProjectId(id);
      setFiles(fetched);
    }

    if (selectedProject) {
      fetchFiles(selectedProject.id);
    }

  }, [selectedProject]);

  const handleUploadFile = async () => {

  };

  const contentArea = selectedProject ? (
    <ScrollView >
      {files.map(file =>
        <Text>
          {file.name}
        </Text>
      )}
    </ScrollView>
  ) : (
    <View >
      <ActivityIndicator size="large" color={colors.corporateBlue}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Project files
      </Text>
      {contentArea}
      <TouchableOpacity onPress={() => handleUploadFile}
        style={styles.buttonContainer}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
}

export default ProjectFiles;
