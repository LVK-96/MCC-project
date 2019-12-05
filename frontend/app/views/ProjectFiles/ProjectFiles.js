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
import FilePickerManager from 'react-native-file-picker';

function ProjectFiles() {
  const { selectedProject, addFile } = useContext(ProjectContext);
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

  const handleUploadFile = () => {
    FilePickerManager.showFilePicker(null, res => {
      if (res.didCancel || res.error) {
        console.log('Failed to pick file');
        return;
      }

      const file = {
        name: res.fileName,
        uri: res.uri,
      };

      const ret = addFile(selectedProject, file);
      // TODO: Don't if this wasn't successful.
      if (ret || !ret) {
        // TODO: Use real response object.
        setFiles(prev => [...prev, file]);
      }
    });
  };

  const contentArea = selectedProject ? (
    <ScrollView >
      {files.map(file =>
      // TODO: Only use uuid as key.
      <View key={file.uuid || file.uri}
        style={styles.file}>
        <Text>
          {file.name}
        </Text>
      </View>
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
      <TouchableOpacity onPress={handleUploadFile}
        style={styles.buttonContainer}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
}

export default ProjectFiles;
