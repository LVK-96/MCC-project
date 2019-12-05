import React, { useContext, useState, useEffect } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import ProjectContext from '../../contexts/ProjectContext';
import PlusIcon from '../PlusIcon';
import colors from '../../values/colors';
import projectService from '../../services/projectService';
import styles from './styles';
import FilePickerManager from 'react-native-file-picker';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';

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

	const handleFileUpload = () => {
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
			if (ret || !ret) {
				// TODO: Use real response object.
				setFiles(prev => [...prev, file]);
			}
		});
	};

	const handleFileDownload = async (file) => {
		try {
			const storageRef = storage().ref();
			const url = await storageRef.child(file.source).getDownloadURL();
			const dirs = RNFetchBlob.fs.dirs;
			RNFetchBlob.config({ path: dirs.DocumentDir })
				.fetch('GET', url);
		} catch (exception) {
			Alert.alert('Failed to download file ' + file.name);
		}
	};

	const contentArea = selectedProject ? (
		<ScrollView >
			{files.map(file =>
				// TODO: Only use uuid as key.
				<View key={file.uuid || file.uri}
					style={styles.file}>
					<TouchableOpacity onPress={() => handleFileDownload(file)}>
						<Text>{file.name}</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	) : (<View >
			<ActivityIndicator size="large" color={colors.corporateBlue} />
		</View>);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>
				Project files
      </Text>
			{contentArea}
			<TouchableOpacity onPress={handleFileUpload}
				style={styles.buttonContainer}>
				<PlusIcon />
			</TouchableOpacity>
		</View>
	);
}

export default ProjectFiles;
